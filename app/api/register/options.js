import User from "@/models/User";
import connect from "@/utils/db";

export async function register(email) {
  try {
    //connect to mongo
    await connect();
    const existingUser = await User.findOne({ email });
    //check exist ing user
    if (existingUser) {
      console.log("Email already exists in MongoDB:", email);
    } else {
      const user = new User({ email });
      await user.save();
      console.log("Email saved to MongoDB:", email);
    }
  } catch (error) {
    console.error("Error saving email to MongoDB:", error);
  }
}
