import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Register = async () => {
  const session = await getServerSession();

  if (session) redirect("/dashboard");

  return (
    <main>
      <RegisterForm />
    </main>
  );
};

export default Register;
