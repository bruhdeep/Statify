import connect from "@/utils/db";
import Follow from "@/models/Follow";
import User from "@/models/User";

export async function GET(request) {
  try {
    await connect();

    const { searchParams } = new URL(
      request.url,
      `http://${request.headers.get("host")}`
    );
    const query = searchParams.get("query");

    if (query === "undefined") {
      return new Response(
        JSON.stringify({ error: "session not initialized" }),
        {
          status: 205,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const user = await Follow.find({ followeeId: query });

    const userexist = await User.findOne({ email: query });

    if (!userexist) {
      console.log("User not found");
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const followerIds = user.map((follow) => follow.followerId);
    return new Response(JSON.stringify(followerIds), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
