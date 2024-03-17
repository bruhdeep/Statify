// pages/posts/[postId].tsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PostPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${searchParams}`;
    console.log(url);
    // You can now use the current URL
    // ...
  }, [pathname, searchParams]);

  return (
    <div>
      <h1>Post ID: {pathname}</h1>
    </div>
  );
};

export default PostPage;
