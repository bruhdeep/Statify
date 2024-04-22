import Recentlyplayed from "@/models/Recentlyplayed";
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
    const query = searchParams.get("query");

    // Find the user by _id in MongoDB
    const track = await Recentlyplayed.find({
      user_email: query,
    })
      .sort({ played_at: -1 })
      .limit(15);

    const userexists = await User.findOne({email: query });

    if (!userexists) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Return the user data
    return new Response(JSON.stringify(track), {
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
