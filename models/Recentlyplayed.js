import mongoose from "mongoose";

const recentlyPlayedSchema = new mongoose.Schema({
  user_email: String,
  track_name: String,
  artist_name: String,
  played_at: Date,
});

const RecentlyPlayed = mongoose.model("RecentlyPlayed", recentlyPlayedSchema);

export default RecentlyPlayed;
