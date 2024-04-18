/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

const SpotifyArtistDetails = ({ artistId }: { artistId: string }) => {
  const { data: session } = useSession();
  const [artistDetails, setArtistDetails] = useState<any>(null);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}`,
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        const data = await response.json();
        setArtistDetails(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching artist details:", error);
      }
    };

    fetchArtistDetails();
  }, [session, artistId]);

  if (!artistDetails) {
    return <p>Loading artist details...</p>;
  }

  return (
    <div>
      <div className="flex gap-10">
        <div className="avatar">
          <div className="rounded">
            <img
              src={artistDetails.images && artistDetails.images[0]?.url}
              alt="Artist Image"
            />
          </div>
        </div>
        <div>
          <p className="font-bold text-3xl">{artistDetails.name}</p>
          <p>
            Genres: {artistDetails.genres && artistDetails.genres.join(", ")}
          </p>
          <p>Popularity: {artistDetails.popularity}</p>
          <p>
            Followers:{" "}
            {artistDetails.followers && artistDetails.followers.total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpotifyArtistDetails;
