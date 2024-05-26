/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const SpotifyArtistDetails = ({ artistId }: { artistId: string }) => {
  const { data: session } = useSession();
  const [artistDetails, setArtistDetails] = useState<any>(null);
  const [relatedArtists, setRelatedArtists] = useState<any[]>([]);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      if (!session?.accessToken) return;

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        const data = await response.json();
        setArtistDetails(data);
        console.log(data);
        fetchRelatedArtists(artistId);
      } catch (error) {
        console.error("Error fetching artist details:", error);
      }
    };

    const fetchRelatedArtists = async (id: string) => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${id}/related-artists`,
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        const data = await response.json();
        setRelatedArtists(data.artists);
        console.log(data.artists);
      } catch (error) {
        console.error("Error fetching related artists:", error);
      }
    };

    fetchArtistDetails();
  }, [session, artistId]);

  if (!artistDetails) {
    return <p>Loading artist details...</p>;
  }

  return (
    <div>
      <div className="lg:flex gap-10">
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
          <Link href={artistDetails.external_urls.spotify}>
            <button className="btn btn-primary">Open in spotify</button>
          </Link>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-2xl mt-5">Related Artists:</h2>
        <br />
        <div className="lg:grid grid-cols-5 gap-5">
          {relatedArtists.slice(0, 5).map((artist, index) => (
            <div key={index} className="card rounded shadow-lg">
              <a href={`/artist/${artist.id}`}>
                <img
                  src={artist.images[0]?.url}
                  alt="Related Artist Image"
                  className="rounded-lg h-40 lg:h-80 w-full object-cover"
                />
              </a>
              <div className="mt-3">
                <p className="font-bold text-center">{artist.name}</p>
                <p className="text-center text-sm">
                  Popularity: {artist.popularity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpotifyArtistDetails;
