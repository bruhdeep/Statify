import connect from "@/utils/db"; // Adjust your import path as needed
import Follow from "@/models/Follow"; // Adjust your import path as needed

export async function POST(request) {
  const { followerId, followeeId } = await request.json();

  try {
    // Connect to MongoDB
    await connect();

    // Check if the user is already following the other user
    const follow = await Follow.findOne({ followerId, followeeId });

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
