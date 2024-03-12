import React from "react";
import TopArtist from "@/components/TopArtist";
import TopTrack from "@/components/TopTrack";

const Dashboard = () => {
  return (
    <div className="h-screen flex">
      <div className="hidden lg:block w-[50%] h-full">
        <div></div>
      </div>
      <div className="w-[100%] lg:w-[50%] h-full">
        <div className="">
          <div className="flex justify-between">
            <div>Favorites</div>
            <div>
              <ul className="menu menu-horizontal bg-base">
                <li>
                  <a>1 month</a>
                </li>
                <li>
                  <a>6 month</a>
                </li>
                <li>
                  <a>All time</a>
                </li>
              </ul>
            </div>
          </div>
          <TopArtist term="short_term"/>
          <br />
          <TopTrack term="short_term"/>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
