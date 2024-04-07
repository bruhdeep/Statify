// pages/api/recentlyPlayed.js

import axios from "axios";
import RecentlyPlayed from "@/models/RecentlyPlayed";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Extract user email from session
    const userEmail = req.session.email;
    console.log(userEmail); // Assuming you have the email address in the session

    // Fetch recently played tracks from Spotify API
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played",
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );

    // Save tracks to MongoDB
    await saveToMongoDB(data.items, userEmail);

    return res
      .status(200)
      .json({ message: "Recently played tracks saved to MongoDB" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function saveToMongoDB(tracks, userEmail) {
  try {
    // Insert each track into MongoDB using the Mongoose model
    for (const track of tracks) {
      const playedAt = new Date(track.played_at);
      const trackData = {
        user_email: userEmail,
        track_name: track.track.name,
        artist_name: track.track.artists[0].name,
        played_at: playedAt,
      };
      await RecentlyPlayed.create(trackData);
    }
  } catch (error) {
    console.error("Error saving to MongoDB:", error);
  }
}
