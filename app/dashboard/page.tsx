"use client";

import React, { useState } from "react";
import TopArtist from "@/components/userdata/TopArtist";
import TopTrack from "@/components/userdata/TopTrack";
import RecentlyPlayed from "@/components/userdata/RecentlyPlayed";
import CurrentlyPlaying from "@/components/userdata/CurrentlyPlaying";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const [term, setTerm] = useState("short_term");

  const handleTermChange = (newTerm: string) => {
    setTerm(newTerm);
  };

  return (
    <div className="h-screen lg:flex pt-5">
      <div className="hidden lg:block w-[50%] h-full">
        <div className="px-5">
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold">Recent</p>
          </div>
          <br />
          <CurrentlyPlaying />
          <RecentlyPlayed />
        </div>
      </div>
      <div className="w-[100%] lg:w-[50%] h-full">
        <div className="text-xl font-bold">
          <div className="flex items-center justify-between">
            <div className="">Favorites</div>
            <div>
              {/* menu to change the term */}
              <ul className="menu menu-horizontal">
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
          </div>
          <TopArtist term={term} />
          <br />
          <TopTrack term={term} />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
