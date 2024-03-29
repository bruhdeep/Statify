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
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        // Add more fields to search if needed
      ],
    });

    // Return the search results
    return new Response(JSON.stringify(users), {
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
