import connect from "@/utils/db";
import User from "@/models/User";

export async function PUT(request) {
  try {
    // Connect to MongoDB
    await connect();

    // Get the userId from the request parameters
    const { searchParams } = new URL(
      request.url,
      `http://${request.headers.get("host")}`
    );
    const userId = searchParams.get("userId");

    // Get the new username from the request body
    const { username } = await request.json();

    // Find the user by _id in MongoDB
    const user = await User.findById(userId);

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Update the username
    user.username = username;
    await user.save();

    // Return the updated user data
    return new Response(JSON.stringify(user), {
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
