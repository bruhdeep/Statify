import axios from "axios";
import Playlist from "@/models/Playlist"; // Assuming you have a Playlist model in your MongoDB database
import connect from "@/utils/db";
import User from "@/models/User";

export async function POST(request) {
  const { accessToken, userEmail } = await request.json();

  try {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const playlistsToSave = data.items.map((playlist) => ({
      user_email: userEmail,
      playlist_id: playlist.id,
      name: playlist.name,
      description: playlist.description,
      public: playlist.public,
      collaborative: playlist.collaborative,
      snapshot_id: playlist.snapshot_id,
      tracks_total: playlist.tracks.total,
      href: playlist.href,
      external_urls: playlist.external_urls.spotify,
      uri: playlist.uri,
      image_url: playlist.images[0].url,
    }));

    await connect();

    const userexists = await User.findOne({ email: userEmail });

    if (!userexists) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    for (const playlistData of playlistsToSave) {
      const duplicate = await Playlist.findOne({
        user_email: playlistData.user_email,
        playlist_id: playlistData.playlist_id,
      });

      if (duplicate) {
        continue;
      } else {
        await Playlist.create(playlistData);
      }
    }

    console.log("Successfully saved playlists to MongoDB.");
    return new Response(
      JSON.stringify("Successfully saved playlists to MongoDB."),
      {
        success: true,
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching or saving playlists:", error);
    return new Response(JSON.stringify("Error fetching or saving playlists:"), {
      success: true,
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
