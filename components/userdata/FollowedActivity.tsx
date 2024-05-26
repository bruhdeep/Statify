/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const FollowedActivity = () => {
  const { data: session } = useSession();
  const [Followers, setFollowers] = useState<any>(null);
  const [tracks, setTracks] = useState<any>(null);
  const [mergedTracks, setMergedTracks] = useState<any>([]);
  const [itemCount, setItemCount] = useState(10);

  useEffect(() => {
    const fetchFollowing = async () => {
      if (session && session?.user?.email) {
        try {
          const response = await fetch(
            `/api/getfollowings?query=${session.user.email}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
          }

          const followers = await response.json();
          if (followers) {
            setFollowers(followers);
          }
        } catch (error) {
          console.error("Error fetching follow status:", error);
        }
      }
    };

    fetchFollowing();
  }, [session]); // Run when session changes
  //no use yeutai useeffect natra gandu hunxa

  useEffect(() => {
    const fetchFollowedActivity = async () => {
      if (Followers) {
        try {
          const responses = await Promise.all(
            Followers.map((follower: any) =>
              fetch(`/api/fetchusersrecentlyplayed?query=${follower}`)
            )
          );

          const data = await Promise.all(
            responses.map((response) => response.json())
          );

          setTracks(data);
          const mergedData = data.flat();
          setMergedTracks(mergedData);
          console.log(mergedData);
        } catch (error) {
          console.error("Error fetching followed activity:", error);
        }
      }
    };

    fetchFollowedActivity();
  }, [Followers]); // Run when Followers changes

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
    } else if (difference < 1440) {
      const hours = Math.floor(difference / 60);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return "More than a day ago";
    }
  };

  return (
    <div>
      <ul className="text-black">
        {mergedTracks
          .sort(
            (a: any, b: any) =>
              new Date(b.played_at).getTime() - new Date(a.played_at).getTime()
          )
          .slice(0, itemCount)
          .map((track: any, index: number) => (
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
                  <h3 className="font-bold">
                    {track.user_email.split("@")[0]}
                  </h3>
                  <h3 className="whitespace-nowrap overflow-hidden block text-ellipsis">
                    {track.track_name} by{" "}
                    <span className="font-bold">
                      {track.artist_name.join(", ")}
                    </span>
                  </h3>
                  <div>
                    <p>Played {getTimeAgo(track.played_at)}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
      <div className="flex justify-center">
        <button
          className="btn btn-primary text-center"
          onClick={() => setItemCount(itemCount + 10)}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default FollowedActivity;
