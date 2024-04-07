"use client";

import React, { useState } from "react";

function FollowForm() {
  const [followerId, setFollowerId] = useState("");
  const [followeeId, setFolloweeId] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault(); // Prevent the form from reloading the page

    // Send the POST request to your API route
    const result = await fetch("/api/follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ followerId, followeeId }),
    });

    if (result.ok) {
      const data = await result.json(); // Safe to parse JSON
      setResponse(data);
    } else {
      console.error("Error from API", await result.text()); // Handle non-OK responses
    }
  };

  return (
    <div>
      <h2>Follow a User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="followerId">Follower ID:</label>
          <input
            type="text"
            id="followerId"
            value={followerId}
            onChange={(e) => setFollowerId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="followeeId">Followee ID:</label>
          <input
            type="text"
            id="followeeId"
            value={followeeId}
            onChange={(e) => setFolloweeId(e.target.value)}
          />
        </div>
        <button type="submit">Follow</button>
      </form>
      {response && (
        <div>
          <h3>Response</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default FollowForm;
