import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"


export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {},

            async authorize(credentials){
                const { username, password } = credentials;
                
                try {
                    await connectMongoDB();
                    const user = await User.findOne({ username});

                    if (!user) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if(!passwordsMatch){
                        return null;
                    }

                    return user;
                } catch (error) {
                    console.log("Error occurred while authenticating user", error);
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth({
    ...authOptions,
    session: {
        strategy: "jwt",
    },
});

export {handler as GET, handler as POST};