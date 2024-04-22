import connect from "@/utils/db";
import User from "@/models/User";

export async function GET(request) {
  try {
    // Connect to MongoDB
    await connect();

    // Get the search query from the request query params
    const { searchParams } = new URL(
      request.url,
      `http://${request.headers.get("host")}`
    );
    const query = searchParams.get("query");

    // Perform the search in MongoDB
    const users = await User.findOne(
      { email: { $regex: query, $options: "i" } }
      // Add more fields to search if needed
    );

    if (!users) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Return the search results
    return new Response(JSON.stringify({ userid: users?._id }), {
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
