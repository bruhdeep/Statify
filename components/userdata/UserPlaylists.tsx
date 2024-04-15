/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const PlaylistComponent: React.FC = () => {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState<number>(6);
  const [hasMorePlaylists, setHasMorePlaylists] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `https://api.spotify.com/v1/me/playlists?limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Unable to fetch playlists");
        }

        const data = await response.json();
        if (data && data.items) {
          setPlaylists(data.items);
          if (data.items.length < limit) {
            setHasMorePlaylists(false);
          }
        }
      } catch (error) {
        setError("Error fetching playlists");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.accessToken) {
      fetchPlaylists();
    }
  }, [session, limit]);

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 6);
  };

  if (error) {
    console.log(error);
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
        {playlists.map((playlist: any) => (
          <div key={playlist.id} className="min-w-40 p-4 rounded-lg bg-primary">
            <img
              src={playlist.images[0]?.url}
              alt={playlist.name}
              className="w-full h-54 object-cover mb-4 rounded-lg"
            />
            <h3 className="text-xl font-semibold whitespace-nowrap overflow-hidden block text-ellipsis">
              {playlist.name}
            </h3>
            <p className="text-sm">{`${playlist.tracks.total} tracks`}</p>
            <br />
            <a href={playlist.external_urls.spotify} className="">
              <div className="flex justify-end">
                <button className="btn w-[60%]">View on Spotify</button>
              </div>
            </a>
          </div>
        ))}
      </div>
      {isLoading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="flex justify-center">
          {hasMorePlaylists && (
            <div className="flex justify-center mt-4">
              <button className="btn btn-primary" onClick={handleLoadMore}>
                Load More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlaylistComponent;

// limit to 1 line garna lai
// whitespace-nowrap overflow-hidden block text-ellipsis
