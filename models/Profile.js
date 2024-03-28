import mongoose from "mongoose";

const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Profile || mongoose.model("Profile", profileSchema);