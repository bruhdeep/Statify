import connect from "@/utils/db";
import Follow from "@/models/Follow";
import User from "@/models/User";

export async function POST(request) {
  const { followerId, followeeId } = await request.json();

  try {
    // Connect to MongoDB
    await connect();

    // Check if the user is already following the other user
    const follow = await Follow.findOne({ followerId, followeeId });

    const validFollower = await User.findOne({ email: followerId });
    const validFollowee = await User.findOne({ email: followeeId });

    if (!validFollower || !validFollowee) {
      return new Response(
        JSON.stringify({ error: "You can't unfollow someone who doesn't exist" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (!follow) {
      // If the user is not following the other user, return a 404 response
      return new Response(
        JSON.stringify({ error: "You are not following this user" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Delete the follow document from the database
    await Follow.deleteOne({ _id: follow._id });

    console.log("Unfollowed successfully");

    return new Response(
      JSON.stringify({ success: true, message: "Unfollowed successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error unfollowing:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while unfollowing" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
