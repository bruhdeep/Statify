import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Home = async () => {
  const session = await getServerSession();

  if (session) redirect("/dashboard");
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">Login or Register to get started with Statify.</p>
          <button className="btn btn-primary">
            <a href="/register">Get Started</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
