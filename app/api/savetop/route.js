import axios from "axios";
import TopArtistAndTrack from "@/models/Top";
import connect from "@/utils/db";

export async function POST(request) {
  const { accessToken, userEmail } = await request.json();

  try {
    // Fetch user's top artists and tracks
    const [topArtistsData, topTracksData] = await Promise.all([
      axios.get("https://api.spotify.com/v1/me/top/artists?limit=50", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      axios.get("https://api.spotify.com/v1/me/top/tracks?limit=50", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    ]);

    // Save or update top artists and tracks
    await connect();
    const topArtistsAndTracks = await TopArtistAndTrack.findOneAndUpdate(
      { user_email: userEmail },
      {
        user_email: userEmail,
        top_artists: topArtistsData.data.items.map((artist) => ({
          name: artist.name,
          image: artist.images[0].url,
          popularity: artist.popularity,
        })),
        top_tracks: topTracksData.data.items.map((track) => ({
          name: track.name,
          image: track.album.images[0].url,
          artists: track.artists.map((artist) => artist.name),
          popularity: track.popularity,
        })),
      },
      { upsert: true, new: true }
    );

    console.log("Successfully saved top artists and tracks to MongoDB.");
    return new Response(
      JSON.stringify("Successfully saved top artists and tracks to MongoDB."),
      {
        success: true,
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching or saving top artists and tracks:", error);
    return new Response(
      JSON.stringify("Error fetching or saving top artists and tracks:"),
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
