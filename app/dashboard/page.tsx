// /* eslint-disable @next/next/no-img-element */
// "use client";

// import { useSession } from "next-auth/react";
// import React, { useEffect, useState } from "react";

// interface TopTracks {
//   href: string;
// }

// function Dashboard(): JSX.Element {
//   const { data: session } = useSession();
//   // Define state variables to hold user data
//   const [userData, setUserData] = useState<TopTracks | null>(null);

//   useEffect(() => {
//     // Fetch user data from the Spotify API
//     const fetchUserData = async (): Promise<void> => {
//       try {
//         const response = await fetch("https://api.spotify.com/v1/me/top/tracks", {
//           headers: {
//             Authorization: `Bearer ${session?.accessToken}`, // You need to replace this with your Spotify access token
//           },
//         });
//         const data: TopTracks = await response.json();
//         setUserData(data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData(); // Call the fetchUserData function when the component mounts
//   }, [session]);

//   // Render the user data
//   return (
//     <div>
//       {userData ? (
//         <div>
//           <h2>User Details</h2>
//           <p>Display Name: {userData.display_name}</p>
//           <p>Email: {userData.email}</p>
//           <p>Country: {userData.country}</p>
//           {userData.followers && <p>Followers: {userData.followers.total}</p>}
//           <img src={session?.user?.image || ""} alt="" />
//         </div>
//       ) : (
//         <p>Loading user data...</p>
//       )}
//     </div>
//   );
// }

// export default Dashboard;
