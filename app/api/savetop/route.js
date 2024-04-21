import axios from "axios";
import TopArtistAndTrack from "@/models/Top";
import connect from "@/utils/db";

export async function POST(request) {
  const { accessToken, userEmail } = await request.json();

  try {
    // Fetch user's top artists and tracks for short-term, medium-term, and long-term
    const [
      shortTermArtistsData,
      shortTermTracksData,
      mediumTermArtistsData,
      mediumTermTracksData,
      longTermArtistsData,
      longTermTracksData,
    ] = await Promise.all([
      axios.get(
        "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
      axios.get(
        "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
      axios.get(
        "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
      axios.get(
        "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
      axios.get(
        "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
      axios.get(
        "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
    ]);

    // Save or update top artists and tracks
    await connect();

    await TopArtistAndTrack.findOneAndUpdate(
      { user_email: userEmail },
      {
        user_email: userEmail,
        short_term_top_artists: shortTermArtistsData.data.items.map(
          (artist) => ({
            name: artist.name,
            image:
              artist.images[0]?.url ||
              "https://miro.medium.com/v2/resize:fit:698/1*0jjdu52m0MO4SjLWiCVOlg.jpeg",
            popularity: artist.popularity,
          })
        ),
        short_term_top_tracks: shortTermTracksData.data.items.map((track) => ({
          name: track.name,
          image:
            track.album.images[0]?.url ||
            "https://miro.medium.com/v2/resize:fit:698/1*0jjdu52m0MO4SjLWiCVOlg.jpeg",
          artists: track.artists.map((artist) => artist.name),
          popularity: track.popularity,
        })),
        medium_term_top_artists: mediumTermArtistsData.data.items.map(
          (artist) => ({
            name: artist.name,
            image:
              artist.images[0]?.url ||
              "https://miro.medium.com/v2/resize:fit:698/1*0jjdu52m0MO4SjLWiCVOlg.jpeg",
            popularity: artist.popularity,
          })
        ),
        medium_term_top_tracks: mediumTermTracksData.data.items.map(
          (track) => ({
            name: track.name,
            image:
              track.album.images[0]?.url ||
              "https://miro.medium.com/v2/resize:fit:698/1*0jjdu52m0MO4SjLWiCVOlg.jpeg",
            artists: track.artists.map((artist) => artist.name),
            popularity: track.popularity,
          })
        ),
        long_term_top_artists: longTermArtistsData.data.items.map((artist) => ({
          name: artist.name,
          image:
            artist.images[0]?.url ||
            "https://miro.medium.com/v2/resize:fit:698/1*0jjdu52m0MO4SjLWiCVOlg.jpeg",
          popularity: artist.popularity,
        })),
        long_term_top_tracks: longTermTracksData.data.items.map((track) => ({
          name: track.name,
          image:
            track.album.images[0]?.url ||
            "https://miro.medium.com/v2/resize:fit:698/1*0jjdu52m0MO4SjLWiCVOlg.jpeg",
          artists: track.artists.map((artist) => artist.name),
          popularity: track.popularity,
        })),
      },
      { upsert: true, new: true }
    );

    console.log("Successfully saved top artists and tracks to MongoDB.");
    return new Response(
      JSON.stringify("Successfully saved top artists and tracks to MongoDB."),
      {
        success: true,
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching or saving top artists and tracks:", error);
    return new Response(
      JSON.stringify("Error fetching or saving top artists and tracks:"),
      {
        success: true,
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
