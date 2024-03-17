/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-between items-center gap-10">
        <div className="">
          <p className="xl text-primary">404</p>
          <p className="text-3xl font-bold">Page Not Found</p>
          <p className="text-lg">Not the sauce you are looking for</p>
          <Link href="/dashboard" className="text-primary text-xl">
            Go back
          </Link>
        </div>
        {/* <div className="avatar">
          <div className="w-52 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="not-found.png" alt="??" />
          </div>
        </div> */}
        <div className="w-52">
          <img src="not-found.png" alt="??" />
        </div>
      </div>
    </div>
  );
}
