import InstagramProvider from "next-auth/providers/instagram";

if (!process.env.INSTAGRAM_CLIENT_ID) {
  throw new Error("Missing INSTAGRAM_CLIENT_ID");
}

if (!process.env.INSTAGRAM_CLIENT_SECRET) {
  throw new Error("Missing INSTAGRAM_CLIENT_SECRET");
}

const instagramProfile = InstagramProvider({
  clientId: process.env.INSTAGRAM_CLIENT_ID,
  clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
});

const authURL = `https://api.instagram.com/oauth/authorize?clientId=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=https://realply-insta-fb-poc.vercel.app/&scope=user_profile,user_media&response_type=code`;

instagramProfile.authorization = authURL.toString();

export default instagramProfile;
