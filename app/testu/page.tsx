"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";

function SpotifyFetchComponent() {
  const { data: session } = useSession();
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const fetchRecentlyPlayedTracks = async () => {
    setStatus("loading");
    setErrorMessage("");

    try {
      // Adjust the endpoint as necessary
      const response = await fetch(`/api/saverecentlyplayed`, {
        method: "POST", // or 'POST' if your API requires
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: session?.accessToken,
          userEmail: session?.user?.email,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        console.log("Successfully fetched and stored tracks.");
      } else {
        setStatus("error");
        setErrorMessage("Failed to fetch and store tracks.");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div>
      <button
        onClick={fetchRecentlyPlayedTracks}
        disabled={status === "loading"}
      >
        Fetch Recently Played Tracks
      </button>
      {status === "loading" && <p>Loading...</p>}
      {status === "success" && <p>Tracks fetched and stored successfully!</p>}
      {status === "error" && <p>Error: {errorMessage}</p>}
    </div>
  );
}

export default SpotifyFetchComponent;
