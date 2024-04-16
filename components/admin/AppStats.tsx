"use client";

import React, { useState, useEffect } from "react";

const AppStats = () => {
  const [numusers, setNumusers] = useState(0);
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/searchusers?query");
      if (!res.ok) {
        throw new Error("Failed to fetch user stats");
      }
      const data = await res.json();
      setNumusers(data.length);
    } catch (error) {
      console.error("Error fetching user stats", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-base-200 p-4 rounded-lg">
          <h2 className="text-xl font-bold">Number of users</h2>
          <p className="text-2xl font-bold">{numusers}</p>
        </div>
      </div>
    </div>
  );
};

export default AppStats;
