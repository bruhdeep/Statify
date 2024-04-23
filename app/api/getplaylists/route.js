import Playlist from "@/models/Playlist";
import connect from "@/utils/db";
import User from "@/models/User";

export async function GET(request) {
  try {
    // Connect to MongoDB
    await connect();

    // Get the userId from the request parameters
    const { searchParams } = new URL(
      request.url,
      `http://${request.headers.get("host")}`
    );
    const userEmail = searchParams.get("userEmail");

    const userexists = await User.findOne({email: userEmail });

    if (!userexists) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Find the user's playlists in MongoDB
    const playlists = await Playlist.find({ user_email: userEmail })
      .sort({ createdAt: -1 })
      .limit(50);

    if (!playlists || playlists.length === 0) {
      return new Response(
        JSON.stringify({ error: "No playlists found for the user" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Return the playlist data
    return new Response(JSON.stringify(playlists), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
