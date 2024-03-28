"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const { data: session }: any = useSession();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          searchTerm
        )}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`, // Replace with your Spotify access token
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      setSearchResults(data.tracks.items);
    } catch (error) {
      console.error("Error searching tracks:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Trigger search as user types
    handleSearch();
  };
  return (
    <div>
      {/* modal test */}
      <button
        className="btn btn-link text-slate-300"
        onClick={() =>
          (
            document.getElementById("my_modal_4") as HTMLDialogElement
          ).showModal()
        }
      >
        <FaSearch size={30}/>
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-full h-screen overflow-x-hidden">
          {/* content */}
          <div className="grid">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
                value={searchTerm}
                onChange={handleChange}
              />
            </div>
            <div className="absolute pt-16 z-10 overflow-hidden">
              {searchTerm && (
                <div className="fixed flex items-center justify-center z-50">
                  <div className="rounded-lg p-6">
                    <ul className="grid gap-1">
                      {searchResults.slice(0, 5).map((track: any) => (
                        <li
                          className="py-3 px-2 border border-slate-700 rounded-lg"
                          key={track.id}
                        >
                          <a
                            href={`/track/${track.id}`}
                            className="text-blue-600 hover:underline"
                          >
                            {track.name}
                          </a>{" "}
                          by{" "}
                          {track.artists.map((artist: any, index: number) => (
                            <span key={artist.id}>
                              <a
                                href={`/artist/${artist.id}`}
                                className="text-blue-600 hover:underline"
                              >
                                {artist.name}
                              </a>
                              {index < track.artists.length - 1 && ", "}
                            </span>
                          ))}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Search;
