/* eslint-disable @next/next/no-img-element */
// components/CurrentlyPlaying.tsx

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const CurrentlyPlaying: React.FC = () => {
  const { data: session } = useSession();
  const [currentlyPlaying, setCurrentlyPlaying] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentlyPlaying = async () => {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Unable to fetch currently playing track");
        }

        const data = await response.json();
        if (data && data.item) {
          setCurrentlyPlaying(data.item);
        } else {
          setCurrentlyPlaying(null);
        }
      } catch (error) {
        setError("Error fetching currently playing track");
        console.error(error);
      }
    };

    if (session?.accessToken) {
      fetchCurrentlyPlaying();
    }
  }, [session]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="">
      {currentlyPlaying ? (
        <div className="flex mb-3 bg-primary rounded-lg overflow-hidden">
          <img
            className="p-2 rounded-xl"
            src={currentlyPlaying.album.images[0].url}
            alt={currentlyPlaying.name}
            style={{ width: "100px", height: "100px" }}
          />
          <div className="p-3 flex items-center">
            <div className="">
              <p>
                {currentlyPlaying.name} by{" "}
                <span className="font-bold">
                  {currentlyPlaying.artists
                    .map((artist: any) => artist.name)
                    .join(", ")}
                </span>
              </p>
              <p>Currently Playing</p>
              <span className="loading loading-dots loading-sm"></span>
            </div>
          </div>
        </div>
      ) : (
        // Skeleton loader
        <div className="flex flex-col gap-4 w-52 my-4">
          <div className="flex gap-4 items-center">
            <div className="skeleton w-20 h-20 shrink-0"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-52"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentlyPlaying;
