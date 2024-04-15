import mongoose from "mongoose";

const { Schema } = mongoose;

const playlistSchema = new Schema(
  {
    user_email: {
      type: String,
      required: true,
    },
    playlist_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    public: {
      type: Boolean,
      required: true,
    },
    collaborative: {
      type: Boolean,
      required: true,
    },
    snapshot_id: {
      type: String,
      required: true,
    },
    tracks_total: {
      type: Number,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    external_urls: {
      type: Object,
      required: true,
    },
    uri: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Playlist ||
  mongoose.model("Playlist", playlistSchema);
