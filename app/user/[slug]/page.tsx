import UserInfo from "@/components/userdata/UserInfo";
import React from "react";

const user = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <UserInfo userId={params.slug} />
    </div>
  );
};

export default user;
