import connect from "@/utils/db";
import Follow from "@/models/Follow";

export async function GET(request) {
  const { searchParams } = new URL(
    request.url,
    `http://${request.headers.get("host")}`
  );

  const { followerId, followeeId } = Object.fromEntries(searchParams);

  try {
    // Connect to MongoDB
    await connect();

    // Check if the user is already following the other user
    const follow = await Follow.findOne({ followerId, followeeId });

    if (follow) {
      return new Response(JSON.stringify({ isFollowing: true }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify({ isFollowing: false }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error("Error checking follow status:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while checking the follow status",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
