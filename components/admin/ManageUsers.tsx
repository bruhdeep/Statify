"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  function changeUsername() {
    const requestBody = JSON.stringify({
      username: newUsername,
    });

    fetch(`/api/editusername?userId=${selectedUser}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });
    toast.success("Username updated successfully");
    setTimeout(() => {
      fetchUsers();
    }, 1000);
  }

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/searchusers?query");
      if (!res.ok) {
        throw new Error("Failed to fetch user stats");
      }
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching user stats", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
  };

  return (
    <div>
      {users.map((user: { _id: string; username: string; email: string }) => (
        <div className="flex flex-col gap-4 mt-4" key={user._id}>
          <div className="bg-base-200 p-4 rounded-lg">
            <div>
              <h2 className="text-xl font-bold">{user.username}</h2>
              <p className="text-lg">{user.email}</p>
            </div>
            <div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedUser(user._id);
                  (
                    document.getElementById("edituser") as HTMLDialogElement
                  ).showModal();
                }}
              >
                Edit Username
              </button>
              <dialog id="edituser" className="modal">
                <div className="modal-box flex justify-between">
                  <input
                    placeholder={user.username}
                    onChange={handleChange}
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                  />
                  <button onClick={changeUsername} className="btn btn-primary">
                    Confirm
                  </button>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>Close</button>
                </form>
              </dialog>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageUsers;
