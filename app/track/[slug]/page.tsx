import TrackDetails from "@/components/userdata/TrackDetails";
import React from "react";

const track = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <TrackDetails trackId={params.slug} />
    </div>
  );
};

export default track;
