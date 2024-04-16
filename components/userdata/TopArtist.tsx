/* eslint-disable @next/next/no-img-element */
// components/TopArtist.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface TopArtistProps {
  term: string;
}

const TopArtist: React.FC<TopArtistProps> = ({ term }) => {
  const { data: session } = useSession();
  const [topArtist, setTopArtist] = useState<any>(null);
  const [topArtists, setTopArtists] = useState<any[]>([]);

  useEffect(() => {
    const fetchTopArtist = async () => {
      if (session?.accessToken) {
        try {
          const response = await fetch(
            `https://api.spotify.com/v1/me/top/artists?time_range=${term}`,
            {
              headers: {
                // Add your Spotify API token or authorization header here if needed
                Authorization: `Bearer ${session?.accessToken}`,
              },
            }
          );
          const data = await response.json();
          if (data && data.items && data.items.length > 0) {
            setTopArtist(data.items[0]);
            setTopArtists(data.items);
          }
        } catch (error) {
          console.error("Error fetching top artist:", error);
        }
      }
    };

    fetchTopArtist();
  }, [session, term]);

  return (
    <div className="bg-primary rounded-xl text-black">
      {topArtist && (
        <div className="flex justify-between h-[100%]">
          <div className="p-10">
            <div>
              <p className="text-3xl font-bold">{topArtist.name}</p>
              <br />
              <p className="text-xl">Followers: {topArtist.followers.total}</p>
              <br />
              <button
                className="btn"
                onClick={() =>
                  (
                    document.getElementById("artist") as HTMLDialogElement
                  ).showModal()
                }
              >
                View more
              </button>
              <dialog id="artist" className="modal">
                <div className="modal-box w-11/12 max-w-7xl h-screen bg-primary">
                  <div className="top-artists">
                    {topArtists.map((artist, index) => (
                      <div
                        key={artist.id}
                        className="artist-card flex text-left py-2"
                      >
                        <div className="artist-image flex items-center gap-2">
                          {index + 1}
                          <img
                            className="min-w-20 max-w-20 rounded-lg"
                            src={artist.images[0].url}
                            alt={artist.name}
                          />
                        </div>
                        <div className="artist-info pl-3 whitespace-nowrap overflow-hidden block text-ellipsis">
                          <h3>{artist.name}</h3>
                          <p>Followers: {artist.followers.total}</p>
                          <p className="">
                            Genres: {artist.genres.join(", ")}
                          </p>
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
          <div className="w-60 min-w-32 p-3">
            <img
              className="rounded-lg w-full h-full object-cover"
              src={topArtist.images[0].url}
              alt={topArtist.name}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TopArtist;
