"use client";

import React, { useState } from "react";
import TopArtist from "./userdata/TopArtist";
import TopTrack from "./userdata/TopTrack";

const TermSelect = () => {
  const [term, setTerm] = useState("short_term");

  const handleTermChange = (newTerm: string) => {
    setTerm(newTerm);
  };
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

      <div className="text-xl font-bold">
        <div className="flex items-center justify-between"></div>
        <TopArtist term={term} />
        <br />
        <TopTrack term={term} />
      </div>
    </div>
  );
};

export default TermSelect;
