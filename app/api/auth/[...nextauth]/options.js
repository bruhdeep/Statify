import SpotifyProvider from "next-auth/providers/spotify";

import User from "@/models/User";
import connect from "@/utils/db";

const scopes = [
  "user-read-playback-state",
  "user-read-currently-playing",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-follow-read",
  "user-read-recently-played",
  "user-top-read",
  "user-library-read",
  "user-read-email",
  "user-read-private",
].join(",");

const params = {
  scope: scopes,
};

const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams(params).toString();

async function refreshAccessToken(token) {
  //refresh access token
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", token.refreshToken);
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic" +
        new Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_SECRET
        ).toString("base64"),
    },
    body: params,
  });
  const data = await response.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? token.refreshToken,
    accessTokenExpires: Date.now() + data.expires_in * 1000,
  };
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      authorization: LOGIN_URL,
    }),
    // CredentialsProvider({
    //   id: "credentials",
    //   name: "Credentials",
    //   credentials: {
    //     username: { label: "Email", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     await connect();
    //     try {
    //       const user = await User.findOne({ email: credentials.email });
    //       if (user) {
    //         const isPasswordCorrect = await bcrypt.compare(
    //           credentials.password,
    //           user.password
    //         );
    //         if (isPasswordCorrect) {
    //           return user;
    //         }
    //       }
    //     } catch (err) {
    //       throw new Error(err);
    //     }
    //   },
    // }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        async function saveEmailToMongoDB() {
          try {
            const response = await fetch("https://api.spotify.com/v1/me", {
              headers: {
                Authorization: `Bearer ${account.access_token}`,
              },
            });

            const userData = await response.json();
            const email = userData.email;

            //connect to mongo
            await connect();
            const existingUser = await User.findOne({ email });

            //check existing
            if (existingUser) {
              console.log("Email already exists in MongoDB:", email);
            } else {
              const user = new User({ email });
              await user.save();
              console.log("Email saved to MongoDB:", email);
            }
          } catch (error) {
            console.error("Error saving email to MongoDB:", error);
          }
        }

        //save the email to MongoDB
        saveEmailToMongoDB();
        console.log("email: ", account);

        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at;
        return token;
      }

      //token hasnt expired
      if (Date.now() < token.accessTokenExpires * 1000) {
        return token;
      }

      //token has expired
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default authOptions;
