import connect from "@/utils/db";
import Follow from "@/models/Follow";
import User from "@/models/User";

export async function POST(request) {
  const { followerId, followeeId } = await request.json();
  console.log(followerId, followeeId);
  try {
    // Connect to MongoDB
    await connect();

    const alreadyFollowing = await Follow.findOne({ followerId, followeeId });

    const validFollower = await User.findOne({ email: followerId });
    const validFollowee = await User.findOne({ email: followeeId });

    if (followerId === followeeId) {
      console.log("You can't follow yourself");
      return new Response(
        JSON.stringify({ error: "You can't follow yourself" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (!validFollower || !validFollowee) {
      console.log("You can't follow someone who doesn't exist");
      return new Response(
        JSON.stringify({ error: "You can't follow someone who doesn't exist" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (alreadyFollowing) {
      return new Response(
        JSON.stringify({ success: false, error: "Already Following" }),
        {
          status: 201,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
