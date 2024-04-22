/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

const SpotifyTrackDetails = ({ trackId }: { trackId: string }) => {
  const { data: session } = useSession();
  const [trackDetails, setTrackDetails] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any>(null);

  useEffect(() => {
    const fetchTrackDetails = async () => {
      if (!session?.accessToken) return;

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/tracks/${trackId}`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        const data = await response.json();
        setTrackDetails(data);
        console.log(data);
        fetchRecommendations(data);
      } catch (error) {
        console.error("Error fetching track details:", error);
      }
    };

    const fetchRecommendations = async (trackData: any) => {
      const artistIds = trackData.artists
        .map((artist: any) => artist.id)
        .join(",");
      const trackSeed = trackData.id;
      try {
        const recResponse = await fetch(
          `https://api.spotify.com/v1/recommendations?seed_tracks=${trackSeed}&seed_artists=${artistIds}&limit=5`,
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        const recData = await recResponse.json();
        setRecommendations(recData.tracks);
        console.log(recData.tracks);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchTrackDetails();
  }, [session, trackId]);

  if (!trackDetails) {
    return <p>Loading track details...</p>;
  }

  return (
    <div>
      <div className="lg:flex gap-10">
        <div className="avatar">
          <div className="rounded">
            <img
              src={trackDetails.album && trackDetails.album.images[0].url}
              alt="Track Image"
            />
          </div>
        </div>
        <div>
          <p className="font-bold text-3xl">{trackDetails.name}</p>
          <p>
            Artists:{" "}
            {trackDetails.artists &&
              trackDetails.artists
                .map((artist: { name: any }) => artist.name)
                .join(", ")}
          </p>
          <p>Album: {trackDetails.album && trackDetails.album.name}</p>
          <p>Duration: {msToMinSec(trackDetails.duration_ms)}</p>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-2xl mt-5">Recommended Tracks:</h2>
        <br />
        <div className="lg:grid grid-cols-5 gap-5">
          {recommendations &&
            recommendations.map((track: any, index: number) => (
              <div key={index} className="card rounded shadow-lg">
                <a href={`/track/${track.id}`}>
                  <img
                    src={track.album.images[0]?.url}
                    alt="Track Image"
                    className="rounded-lg h-40 lg:h-80 w-full object-cover"
                  />
                </a>
                <div className="mt-3">
                  <p className="font-bold text-center">{track.name}</p>
                  <a href={`/artist/${track.artists[0].id}`}>
                    <p className="text-center text-sm">
                      {track.artists
                        .map((artist: any) => artist.name)
                        .join(", ")}
                    </p>
                  </a>
                </div>{" "}
                <br />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const msToMinSec = (milliseconds: number) => {
  const totalSeconds = milliseconds / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default SpotifyTrackDetails;
