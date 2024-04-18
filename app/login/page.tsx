import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (session) redirect("/dashboard");

  return (
    <main className="min-h-screen">
      <LoginForm />
    </main>
  );
}
