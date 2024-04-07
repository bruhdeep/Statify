import connect from "@/utils/db";
import User from "@/models/User";

export async function POST(request) {
  const { email, username, imageurl } = await request.json();
  console.log(email, username, imageurl);
  try {
    // Connect to MongoDB
    await connect();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("User already exists in MongoDB:", email);
      return new Response(JSON.stringify({ success: false }), {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      // Create a new user instance with email and username
      const user = new User({ email, username, imageurl });
      await user.save();
      // Save the user to MongoDB
      console.log("Email and username saved to MongoDB");
      return new Response(
        JSON.stringify("Email and username saved to MongoDB"),
        {
          success: true,
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.error("Error saving email and username to MongoDB:", error);
  }
}
