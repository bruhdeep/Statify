import mongoose from "mongoose";

const { Schema } = mongoose;

const followSchema = new Schema(
  {
    followerId: { type: String, required: false },
    followeeId: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.Follow || mongoose.model("Follow", followSchema);
