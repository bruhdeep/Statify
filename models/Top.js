import mongoose from "mongoose";

const { Schema } = mongoose;

const topSchema = new Schema(
  {
    user_email: {
      type: String,
      required: true,
    },
    short_term_top_artists: [
      {
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        popularity: {
          type: Number,
          required: true,
        },
      },
    ],
    short_term_top_tracks: [
      {
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        artists: {
          type: [String],
          required: true,
        },
        popularity: {
          type: Number,
          required: true,
        },
      },
    ],
    medium_term_top_artists: [
      {
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        popularity: {
          type: Number,
          required: true,
        },
      },
    ],
    medium_term_top_tracks: [
      {
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        artists: {
          type: [String],
          required: true,
        },
        popularity: {
          type: Number,
          required: true,
        },
      },
    ],
    long_term_top_artists: [
      {
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        popularity: {
          type: Number,
          required: true,
        },
      },
    ],
    long_term_top_tracks: [
      {
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        artists: {
          type: [String],
          required: true,
        },
        popularity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Top || mongoose.model("Top", topSchema);
