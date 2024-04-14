import connect from "@/utils/db";
import Follow from "@/models/Follow";

export async function GET(request) {
  try {
    await connect();

    const { searchParams } = new URL(
      request.url,
      `http://${request.headers.get("host")}`
    );
    const query = searchParams.get("query");

    //to prevent empty array passing
    //use for test failure thingy in docs
    //similiar one is top thingy
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

    const user = await Follow.find({ followerId: query });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const followeeIds = user.map((follow) => follow.followeeId);
    return new Response(JSON.stringify(followeeIds), {
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
