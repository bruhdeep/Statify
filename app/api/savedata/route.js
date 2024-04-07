// pages/api/recentlyPlayed.js

import axios from "axios";
import RecentlyPlayed from "@/models/Recentlyplayed";

export async function GET(req, res) {
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

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ success: false }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
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
