/* eslint-disable @next/next/no-img-element */
import React from "react";

const TopArtistsAndTracks = ({ data }: { data: any }) => {
  if (!data || !data.top_artists || !data.top_tracks) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex gap-5">
      <div>
        {data.top_artists.slice(0, 1).map((artist: any) => (
          <div key={artist._id}>
            <img className="h-24" src={artist.image} alt={artist.name} />
            <h3>{artist.name}</h3>
            <p>Popularity: {artist.popularity}</p>
          </div>
        ))}
      </div>
      <div>
        {data.top_tracks.slice(0, 1).map((track: any) => (
          <div key={track._id}>
            <img className="h-24" src={track.image} alt={track.name} />
            <h3>{track.name}</h3>
            <p>Artists: {track.artists.join(", ")}</p>
            <p>Popularity: {track.popularity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArtistsAndTracks;
