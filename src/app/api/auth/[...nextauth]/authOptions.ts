import { Account, NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import instagramProfile from "./instagramProfile";
import FacebookProvider from "next-auth/providers/facebook";
import facebookProfile from "./facebookProfile";

export const authOptions: NextAuthOptions = {
  providers: [instagramProfile, facebookProfile],
  callbacks: {
    async jwt({ token, account }: { token: any; account: any }) {
      if (!account) {
        return token;
      }

      const updatedToken = {
        ...token,
        access_token: account?.access_token,
        token_type: account?.token_type,
        expires_at: account?.expires_at ?? Date.now() / 1000,
        expires_in: (account?.expires_at ?? 0) - Date.now() / 1000,
        refresh_token: account?.refresh_token,
        scope: account?.scope,
        id: account?.providerAccountId,
      };

      //   if (Date.now() < updatedToken.expires_at) {
      //     return refreshAccessToken(updatedToken);
      //   }
      console.log({ updatedToken });
      console.log("TOKEN ==> ", token);
      return updatedToken;
    },
    async session({ session, token }: { session: any; token: any }) {
      console.log({ session });
      console.log({ token });
      const user = {
        ...session.user,
        access_token: token.access_token,
        token_type: token.token_type,
        expires_at: token.expires_at,
        expires_in: token.expires_in,
        refresh_token: token.refresh_token,
        scope: token.scope,
        id: token.id,
      };
      session.user = user;
      session.error = token.error;
      console.log({ session });
      console.log({ user });
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export default handler;
