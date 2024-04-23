import mongoose from "mongoose";

const { Schema } = mongoose;

const recentlyPlayedSchema = new Schema(
  {
    user_email: {
      type: String,
      required: true,
    },
    track_name: {
      type: String,
      required: true,
    },
    artist_name: {
      type: [String],
      required: true,
    },
    played_at: {
      type: Date,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.recentlyPlayed ||
  mongoose.model("recentlyPlayed", recentlyPlayedSchema);
