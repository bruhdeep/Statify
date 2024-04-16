import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ token }) => token?.email === process.env.ADMIN_EMAIL,
  },
});

export const config = { matcher: ["/admin"] };
