import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: false },
    username: { type: String, required: false },
    imageurl: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
