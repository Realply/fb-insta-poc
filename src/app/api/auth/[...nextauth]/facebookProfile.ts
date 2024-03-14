import FacebookProvider from "next-auth/providers/facebook";

if (!process.env.FACEBOOK_CLIENT_ID) {
  throw new Error("Missing Client Id");
}

if (!process.env.FACEBOOK_CLIENT_SECRET) {
  throw new Error("Missing Client Secret");
}

const facebookProfile = FacebookProvider({
  clientId: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
});
const authURL = `https://www.facebook.com/v11.0/dialog/oauth?client_id=${process.env.FACEBOOK_CLIENT_ID}scope=email,user_photos,instagram_basic,pages_show_list,user_posts,instagram_graph_user_media,user_videos,instagram_graph_user_profile&response_type=code&redirect_uri=https://realply-insta-fb-poc.vercel.app/`;

facebookProfile.authorization = authURL.toString();

export default facebookProfile;

