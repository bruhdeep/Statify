/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

const SpotifyTrackDetails = ({ trackId }: { trackId: string }) => {
  const { data: session } = useSession();
  const [trackDetails, setTrackDetails] = useState<any>(null);

  useEffect(() => {
    const fetchTrackDetails = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/tracks/${trackId}`,
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        const data = await response.json();
        setTrackDetails(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching track details:", error);
      }
    };

    fetchTrackDetails();
  }, [session, trackId]);

  if (!trackDetails) {
    return <p>Loading track details...</p>;
  }

  return (
    <div>
      <div>
        <div className="flex gap-10">
          <div className="avatar">
            <div className="w-56 rounded">
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
            <p>
              Album:
              {trackDetails.album && trackDetails.album.name}
            </p>
            <p>Duration: {msToMinSec(trackDetails.duration_ms)}</p>
            <p>
              Genre: {trackDetails.genres && trackDetails.genres.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

//function to convert milliseconds to minutes and seconds
const msToMinSec = (milliseconds: number) => {
  const totalSeconds = milliseconds / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default SpotifyTrackDetails;
