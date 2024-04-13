import axios from "axios";
import RecentlyPlayed from "@/models/Recentlyplayed";
import connect from "@/utils/db";

export async function POST(request) {
  const { accessToken, userEmail } = await request.json();
  try {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played?limit=50",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const tracksToSave = data.items.map((item) => ({
      user_email: userEmail,
      track_name: item.track.name,
      artist_name: item.track.artists.map((artist) => artist.name), // Assuming multiple artists
      played_at: new Date(item.played_at),
      image_url: item.track.album.images[0].url,
    }));

    // Save each track to MongoDB
    await connect();
    for (const trackData of tracksToSave) {
      const duplicate = await RecentlyPlayed.findOne({
        user_email: trackData.user_email,
        track_name: trackData.track_name,
        played_at: trackData.played_at,
      });
      if (duplicate) {
        continue;
      } else {
        await RecentlyPlayed.create(trackData);
      }
    }

    console.log("Successfully saved recently played tracks to MongoDB.");
    return new Response(
      JSON.stringify("Successfully saved recently played tracks to MongoDB."),
      {
        success: true,
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching or saving recently played tracks:", error);
    return new Response(
      JSON.stringify("Error fetching or saving recently played tracks:"),
      {
        success: true,
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
