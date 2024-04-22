import TopArtistAndTrack from "@/models/Top";
import connect from "@/utils/db";
import User from "@/models/User";

export async function GET(request) {
  const { searchParams } = new URL(
    request.url,
    `http://${request.headers.get("host")}`
  );
  const query = searchParams.get("query");

  try {
    await connect();

    const topArtistAndTrack = await TopArtistAndTrack.findOne({
      user_email: query,
    });

    const userexists = await User.findOne({ query });

    if (!userexists) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    if (!topArtistAndTrack) {
      return new Response(
        JSON.stringify("No top artists and tracks found for the user."),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(JSON.stringify(topArtistAndTrack), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching top artists and tracks:", error);
    return new Response(
      JSON.stringify("Error fetching top artists and tracks:"),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
