/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

import Link from "next/link";

const Search = () => {
  const { data: session }: any = useSession();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  const handletrackSearch = async () => {
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

  const handleuserSearch = async () => {
    try {
      const response = await fetch(`/api/searchusers?query=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        // Handle the case when the response is not successful
        setUsers([]);
        console.error("Error fetching users");
      }
    } catch (error) {
      console.error(error);
      setUsers([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Trigger search as user types
    handletrackSearch();
    handleuserSearch();
  };
  return (
    <div>
      {/* modal test */}
      <button
        className="btn btn-ghost btn-circle"
        onClick={() =>
          (
            document.getElementById("searchmodal") as HTMLDialogElement
          ).showModal()
        }
      >
        <FaSearch size={28} />
      </button>
      <dialog id="searchmodal" className="modal">
        <div className="modal-box w-11/12 max-w-7xl h-screen bg-primary">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-3 lg:flex lg:gap-0 ">
            <div className="pt-5 z-10 overflow-hidden lg:w-[57%]">
              {searchTerm && (
                <div className="">
                  <div className="rounded-lg p-6 grid gap-5">
                    <p className="font-bold">Tracks:</p>
                    <ul className="grid gap-1">
                      {searchResults.slice(0, 5).map((track: any) => (
                        <li
                          className="py-3 px-2 border border-slate-500 text-slate-400 bg-black rounded-lg"
                          key={track.id}
                        >
                          <a
                            href={`/track/${track.id}`}
                            className="text-primary hover:underline"
                          >
                            {track.name}
                          </a>{" "}
                          by{" "}
                          {track.artists.map((artist: any, index: number) => (
                            <span key={artist.id}>
                              <a
                                href={`/artist/${artist.id}`}
                                className="text-primary hover:underline"
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
            <div className="pt-5 z-10 overflow-hidden lg:w-[57%]">
              {searchTerm && (
                <div className="">
                  <div className="rounded-lg p-6 grid gap-5">
                    <p className="font-bold">Users:</p>
                    <ul className="grid gap-1">
                      {users.map(
                        (user: {
                          imageurl: string | undefined;
                          _id: string;
                          username: string;
                        }) => (
                          <Link href={`/user/${user._id}`} key={user._id}>
                            <li className="py-3 px-2 border border-slate-500 bg-black text-slate-400 rounded-lg flex gap-2">
                              <div className="rounded-2xl overflow-hidden">
                                <img
                                  className="object-cover"
                                  src={user.imageurl}
                                  alt=""
                                  width={30}
                                />
                              </div>
                              <div>{user.username}</div>
                            </li>{" "}
                          </Link>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Search;

{
  /* <div className="form-control">
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
            </div> */
}
