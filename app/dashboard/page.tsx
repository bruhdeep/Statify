"use client";

import React, { useState } from "react";
import TopArtist from "@/components/userdata/TopArtist";
import TopTrack from "@/components/userdata/TopTrack";
import RecentlyPlayed from "@/components/userdata/RecentlyPlayed";

const Dashboard = () => {
  const [term, setTerm] = useState("short_term");
  console.log(term);

  const handleTermChange = (newTerm: string) => {
    setTerm(newTerm);
  };

  return (
    <div className="h-screen flex">
      <div className="hidden lg:block w-[50%] h-full">
        <div>
          <RecentlyPlayed />
        </div>
      </div>
      <div className="w-[100%] lg:w-[50%] h-full">
        <div className="">
          <div className="flex justify-between">
            <div>Favorites</div>
            <div>
              <ul className="menu menu-horizontal bg-base">
                <li>
                  <a onClick={() => handleTermChange("short_term")}>1 month</a>
                </li>
                <li>
                  <a onClick={() => handleTermChange("medium_term")}>6 month</a>
                </li>
                <li>
                  <a onClick={() => handleTermChange("long_term")}>All time</a>
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
