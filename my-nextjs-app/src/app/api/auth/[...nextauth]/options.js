import SpotifyProvider from "next-auth/providers/spotify";


const options = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            scope: 'user-read-email user-read-private playlist-read-private playlist-modify-private playlist-modify-public',
            authorization: "https://accounts.spotify.com/authorize?scope=user-read-email user-read-private playlist-read-private playlist-modify-private playlist-modify-public",
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if(account) {
                token.id = account.id;
                token.expires_at = account.expires_at;
                token.accessToken = account.access_token;
                token.scope = account.scope
            }
            console.log('Token:', token);

            return token;
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
    },
    // pages: {}
};

export default options;




/*import spotifyApi from "@/app/lib/spotify";
import { customAuthorizationLogic } from "@/app/lib/auth";*/


            /*refreshToken: true, // Automatically refreshes token

            /*customAuthorization: customAuthorizationLogic,*/

/* {
        async signIn(user, account, profile) {
            // check if the authentication provider is spotify
            if(account.provider === 'spotify') {
                // access token is available in account.accessToken
                const accessToken = account.accessToken;
                console.log('Access Token:', accessToken);

                // use this access token to make requests to the spotify api
                spotifyApi.setAccessToken(accessToken);
            }
            // return true to indicate successful sign-in
            return true;
        },
    },*/