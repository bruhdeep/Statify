"use client";

import { signIn } from "next-auth/react";
import React from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-center">
      <button onClick={() => signIn("spotify", { callbackUrl: "/" })}>
        Login With Spotify
      </button>
    </div>
  );
};

export default Login;
