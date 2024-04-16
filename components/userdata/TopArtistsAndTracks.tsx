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
    <div className="w-[98%] md:w-fit">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold pl-2">Favorites</div>
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
        <div className="">
          <div className="flex gap-2 rounded-xl p-2">
            <div className="min-w-[50%]">
              {data.short_term_top_artists.slice(0, 1).map((artist: any) => (
                <div key={artist._id} className="">
                  <img
                    className="h-60 rounded-lg object-cover"
                    src={artist.image}
                    alt={artist.name}
                  />
                  <h3 className="font-extrabold text-lg">{artist.name}</h3>
                  <p className="font-semibold text-sm">
                    Popularity: {artist.popularity}
                  </p>
                </div>
              ))}
            </div>
            <div className="min-w-[50%]">
              {data.short_term_top_tracks.slice(0, 1).map((track: any) => (
                <div key={track._id} className="text-right">
                  <img
                    className="h-60 rounded-lg object-cover"
                    src={track.image}
                    alt={track.name}
                  />
                  <h3 className="font-extrabold text-lg whitespace-nowrap overflow-hidden block text-ellipsis">
                    {track.name}
                  </h3>
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
          <div className="flex justify-between gap-2 rounded-xl p-2">
            <div className="min-w-[50%]">
              {data.medium_term_top_artists.slice(0, 1).map((artist: any) => (
                <div key={artist._id} className="">
                  <img
                    className="h-60 rounded-lg object-cover"
                    src={artist.image}
                    alt={artist.name}
                  />
                  <h3 className="font-extrabold text-lg">{artist.name}</h3>
                  <p className="font-semibold text-sm">
                    Popularity: {artist.popularity}
                  </p>
                </div>
              ))}
            </div>
            <div className="min-w-[50%]">
              {data.medium_term_top_tracks.slice(0, 1).map((track: any) => (
                <div key={track._id} className="text-right">
                  <img
                    className="h-60 rounded-lg object-cover"
                    src={track.image}
                    alt={track.name}
                  />
                  <h3 className="font-extrabold text-lg whitespace-nowrap overflow-hidden block text-ellipsis">
                    {track.name}
                  </h3>
                  <p className="font-semibold text-sm">
                    {track.artists.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {term === "long_term" && (
        <div>
          <div className="flex justify-between gap-2 rounded-xl p-2">
            <div className="min-w-[50%] max-w-60">
              {data.long_term_top_artists.slice(0, 1).map((artist: any) => (
                <div key={artist._id} className="">
                  <img
                    className="h-60 rounded-lg object-cover"
                    src={artist.image}
                    alt={artist.name}
                  />
                  <h3 className="font-extrabold text-lg">{artist.name}</h3>
                  <p className="font-semibold text-sm">
                    Popularity: {artist.popularity}
                  </p>
                </div>
              ))}
            </div>
            <div className="min-w-[50%] max-w-60">
              {data.long_term_top_tracks.slice(0, 1).map((track: any) => (
                <div key={track._id} className="text-right">
                  <img
                    className="h-60 rounded-lg object-cover"
                    src={track.image}
                    alt={track.name}
                  />
                  <h3 className="font-extrabold text-lg whitespace-nowrap overflow-hidden block text-ellipsis">
                    {track.name}
                  </h3>
                  <p className="font-semibold text-sm">
                    {track.artists.join(", ")}
                  </p>
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

{
  /* {topTrack && (
        <div className="flex justify-between h-[100%]">
          <div className="w-60 min-w-32 h-60 p-3">
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
            </div>
          </div>
        </div>
      )} */
}
