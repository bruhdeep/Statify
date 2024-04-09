/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const UserInfo = ({ userId }: { userId: string }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);
  const [trackdata, setTrackData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users?query=${userId}`);

        const data = await response.json();

        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchRecentlyPlayed = async () => {
      setError("");
      try {
        const response = await fetch(
          `/api/fetchusersrecentlyplayed?query=${user.email}`
        );

        if (response.ok) {
          const trackdata = await response.json();
          console.log("asdwib", trackdata);
          setTrackData(trackdata);
        } else {
          throw new Error("Unable to fetch recently played tracks");
        }
      } catch (error) {
        setError("Error fetching recently played tracks");
        console.error(error);
      }
    };

    fetchUser();
    fetchRecentlyPlayed();
    const interval = setInterval(fetchRecentlyPlayed, 10000); // Refresh every 10 seconds

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, [userId, session, user?.email]);

  const getTimeAgo = (timestamp: string): string => {
    const currentTime = new Date();
    const playedTime = new Date(timestamp);
    const difference = Math.floor(
      (currentTime.getTime() - playedTime.getTime()) / 60000
    ); // Convert milliseconds to minutes

    if (difference < 1) {
      return "Just now";
    } else if (difference === 1) {
      return "1 minute ago";
    } else if (difference < 60) {
      return `${difference} minutes ago`;
    } else {
      return "More than an hour ago";
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  function handleFollow() {
    // Send a POST request to your API route
    const requestBody = JSON.stringify({
      followerId: user.email,
      followeeId: session?.user?.email,
    });

    fetch("/api/follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });
  }

  function saverecentlyplayed() {
    // Send a POST request to your API route
    const requestBody = JSON.stringify({
      accessToken: session?.accessToken,
      userEmail: session?.user?.email,
    });

    fetch("/api/saverecentlyplayed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });
  }

  return (
    <div className="pt-20">
      <div className="flex gap-5">
        <div className="avatar">
          <div className="w-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user.imageurl} alt="" />
          </div>
        </div>
        <div className="text-xl grid items-center gap-2">
          <p>{user.username}</p>

          <button onClick={handleFollow} className="btn btn-primary">
            Follow
          </button>
          <button onClick={saverecentlyplayed} className="btn btn-primary">
            Save Recently Played Tracks
          </button>
        </div>
      </div>
      <br />
      <p className="font-bold text-xl">Recently Played</p>
      <br />
      <div>
        <ul className="">
          <p>{error}</p>
          {trackdata.map((track: any, index: number) => (
            <li
              key={index}
              className="flex mb-3 bg-primary rounded-lg overflow-hidden"
            >
              <img
                className="p-2 rounded-xl"
                src={track.image_url}
                alt={track.track_name}
                style={{ width: "100px", height: "100px" }}
              />
              <div className="p-3 grid items-center justify-center">
                <div className="grid">
                  <h3 className="whitespace-nowrap overflow-hidden block text-ellipsis">
                    {track.track_name} by{" "}
                    <span className="font-bold">{track.artist_name}</span>
                  </h3>
                  <div>
                    <p>Played {getTimeAgo(track.played_at)}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserInfo;
