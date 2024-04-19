/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface TopTrackProps {
  term: string;
}

const TopTrack: React.FC<TopTrackProps> = ({ term }) => {
  const { data: session } = useSession();
  const [topTrack, setTopTrack] = useState<any>(null);
  const [topTracks, setTopTracks] = useState<any[]>([]);

  useEffect(() => {
    const fetchTopTrack = async () => {
      if (session?.accessToken) {
        try {
          const response = await fetch(
            `https://api.spotify.com/v1/me/top/tracks?time_range=${term}`,
            {
              headers: {
                Authorization: `Bearer ${session?.accessToken}`,
              },
            }
          );
          const data = await response.json();
          if (data && data.items && data.items.length > 0) {
            setTopTrack(data.items[0]);
            setTopTracks(data.items);
          }
        } catch (error) {
          console.error("Error fetching top track:", error);
        }
      }
    };
    fetchTopTrack();
  }, [session, term]);

  return (
    <div className="bg-primary rounded-xl">
      {topTrack && (
        <div className="flex justify-between h-[100%]">
          <div className="w-60 min-w-32 p-3">
            <img
              className="rounded-lg w-full h-[100%] object-cover"
              src={topTrack.album.images[0].url}
              alt={topTrack.name}
            />
          </div>
          <div className=" p-10">
            <div className="text-right">
              <p className="text-3xl font-bold">{topTrack.name}</p>
              <br />
              <p className="text-xl">Popularity: {topTrack.popularity}</p>
              <br />
              <button
                className="btn btn-neutral"
                onClick={() =>
                  (
                    document.getElementById("track") as HTMLDialogElement
                  ).showModal()
                }
              >
                View more
              </button>
              <dialog id="track" className="modal">
                <div className="modal-box w-11/12 max-w-7xl h-screen bg-primary">
                  <div className="top-tracks">
                    {topTracks.map((track, index) => (
                      <div key={track.id} className="track flex text-left py-2">
                        <div className="track-image flex items-center gap-2">
                          {index + 1}
                          <img
                            className="min-w-20 max-w-20 rounded-lg"
                            src={track.album.images[0].url}
                            alt={track.name}
                          />
                        </div>
                        <div className="track-info pl-3 whitespace-nowrap overflow-hidden block text-ellipsis">
                          <h3>{track.name}</h3>
                          <p>
                            {track.artists
                              .map((artist: { name: any }) => artist.name)
                              .join(", ")}
                          </p>
                          <p>{track.album.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopTrack;
