"use client";

import React, { useState } from "react";
import FollowedActivity from "@/components/userdata/FollowedActivity";
import CurrentlyPlaying from "@/components/userdata/CurrentlyPlaying";
import RecentlyPlayed from "@/components/userdata/RecentlyPlayed";

const DashboardSelector = () => {
  const [selectedMenu, setSelectedMenu] = useState("me");
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">Recent</p>
        <div className="text-right">
          <ul className="menu menu-horizontal font-bold">
            <li>
              <a
                onClick={() => setSelectedMenu("me")}
                className={selectedMenu === "me" ? "active" : ""}
              >
                My Activity
              </a>
            </li>
            <li>
              <a
                onClick={() => setSelectedMenu("others")}
                className={selectedMenu === "others" ? "active" : ""}
              >
                Friends Activity
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        {selectedMenu === "me" && (
          <div>
            <CurrentlyPlaying />
            <RecentlyPlayed />
          </div>
        )}
        {selectedMenu === "others" && (
          <div>
            <FollowedActivity />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSelector;
