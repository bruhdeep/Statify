import React from "react";
import TopArtist from "@/components/TopArtist";

const Dashboard = () => {
  return (
    <div className="h-screen flex bg-white">
      <div className="hidden lg:block w-[50%] h-full bg-red-600"></div>
      <div className="w-[100%] lg:w-[50%] h-full bg-green-600">
        <div>
          <TopArtist />
        </div>
        <div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
