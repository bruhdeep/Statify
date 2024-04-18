import ArtistDetails from "@/components/userdata/ArtistDetails";
import React from "react";

const track = ({ params }: { params: { slug: string } }) => {
  return (
    <div className="min-h-screen">
      <ArtistDetails artistId={params.slug} />
    </div>
  );
};

export default track;
