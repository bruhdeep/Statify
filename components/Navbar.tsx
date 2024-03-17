/* eslint-disable @next/next/no-img-element */
// components/Navbars.tsx
"use client";

import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";

const Navbars = () => {
  const { data: session }: any = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

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
    <div className="">
      <div className="navbar bg-base-100">
        <div className="flex-1 text-primary">
          <a href="/" className="btn btn-ghost text-xl">
            Statify
          </a>
        </div>
        <div className="flex-none gap-2">
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
                  <div className="bg-white rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Search Results</h2>
                    <ul>
                      {searchResults.map((track: any) => (
                        <li className="flex flex-row" key={track.id}>
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

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              {session ? (
                <div className="w-10 rounded-full">
                  <img alt="Profilepic" src={session?.user?.image} />
                </div>
              ) : (
                <div className="w-10 rounded-full">
                  <FaUser size={40} />
                </div>
              )}
            </div>
            <ul
              tabIndex={0}
              className=" z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              {session && (
                <li>
                  <Link href={"/profile"}>
                    <button>Profile</button>
                  </Link>
                </li>
              )}
              {session && (
                <li>
                  <a>Settings</a>
                </li>
              )}
              <li>
                {session ? (
                  <button
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <Link href={"/login"}>
                    <button>Login</button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbars;
