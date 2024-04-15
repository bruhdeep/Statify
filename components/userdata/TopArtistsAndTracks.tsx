/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

const TopArtistsAndTracks = ({ data }: { data: any }) => {
  const [term, setTerm] = useState("short_term");

  const handleTermChange = (newTerm: string) => {
    setTerm(newTerm);
  };
  if (
    !data ||
    !data.long_term_top_artists ||
    !data.long_term_top_tracks ||
    !data.medium_term_top_artists ||
    !data.medium_term_top_tracks ||
    !data.short_term_top_artists ||
    !data.short_term_top_tracks
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Favorites</div>
        {/* menu to change the term */}
        <ul className="menu menu-horizontal font-bold">
          <li>
            <a
              onClick={() => handleTermChange("short_term")}
              className={term === "short_term" ? "active" : ""}
            >
              1 month
            </a>
          </li>
          <li>
            <a
              onClick={() => handleTermChange("medium_term")}
              className={term === "medium_term" ? "active" : ""}
            >
              6 month
            </a>
          </li>
          <li>
            <a
              onClick={() => handleTermChange("long_term")}
              className={term === "long_term" ? "active" : ""}
            >
              All time
            </a>
          </li>
        </ul>
      </div>
      {term === "short_term" && (
        <div>
          <div className="flex justify-between gap-10">
            <div>
              {data.short_term_top_artists.slice(0, 1).map((artist: any) => (
                <div key={artist._id}>
                  <img className="h-36" src={artist.image} alt={artist.name} />
                  <h3>{artist.name}</h3>
                  <p>Popularity: {artist.popularity}</p>
                </div>
              ))}
            </div>
            <div>
              {data.short_term_top_tracks.slice(0, 1).map((track: any) => (
                <div key={track._id}>
                  <img className="h-36" src={track.image} alt={track.name} />
                  <h3 className="font-extrabold text-lg">{track.name}</h3>
                  <p className="font-semibold text-sm">
                    {track.artists.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {term === "medium_term" && (
        <div>
          <div className="flex justify-between">
            <div>
              {data.medium_term_top_artists.slice(0, 1).map((artist: any) => (
                <div key={artist._id}>
                  <img className="h-24" src={artist.image} alt={artist.name} />
                  <h3>{artist.name}</h3>
                  <p>Popularity: {artist.popularity}</p>
                </div>
              ))}
            </div>
            <div>
              {data.medium_term_top_tracks.slice(0, 1).map((track: any) => (
                <div key={track._id}>
                  <img className="h-24" src={track.image} alt={track.name} />
                  <h3>{track.name}</h3>
                  <p>Artists: {track.artists.join(", ")}</p>
                  <p>Popularity: {track.popularity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {term === "long_term" && (
        <div>
          <div className="flex justify-between">
            <div>
              {data.long_term_top_artists.slice(0, 1).map((artist: any) => (
                <div key={artist._id}>
                  <img className="h-24" src={artist.image} alt={artist.name} />
                  <h3>{artist.name}</h3>
                  <p>Popularity: {artist.popularity}</p>
                </div>
              ))}
            </div>
            <div>
              {data.long_term_top_tracks.slice(0, 1).map((track: any) => (
                <div key={track._id}>
                  <img className="h-24" src={track.image} alt={track.name} />
                  <h3>{track.name}</h3>
                  <p>Artists: {track.artists.join(", ")}</p>
                  <p>Popularity: {track.popularity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopArtistsAndTracks;
