import UserInfo from "@/components/UserInfo";
import Link from "next/link";
import React from "react";

const Landing = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Login or Register to get started with Statify.
          </p>
          <button className="btn btn-primary"><a href="/register">Get Started</a></button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
