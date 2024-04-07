import connect from "@/utils/db"; // Adjust your import path as needed
import Follow from "@/models/Follow"; // Adjust your import path as needed

export async function POST(request) {
  const { followerId, followeeId } = await request.json();
  console.log(followerId, followeeId);
  try {
    // Connect to MongoDB
    await connect();

    const alreadyFollowing = await Follow.findOne({ followerId, followeeId });

    if (alreadyFollowing) {
      console.log("already follwing");
      return new Response(JSON.stringify({ success: false }), {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      const follow = new Follow({ followerId, followeeId });
      await follow.save();
      console.log("Follow saved to MongoDB");
      return new Response(JSON.stringify("Follow saved to MongoDB"), {
        success: true,
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error("Error follwoing", error);
  }
}
