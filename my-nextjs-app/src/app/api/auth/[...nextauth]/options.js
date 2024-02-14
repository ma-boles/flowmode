import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi from "@/app/lib/spotify";
import { customAuthorizationLogic } from "@/app/lib/auth";

const options = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            scopes: 'user-read-private playlist-read-private playlist-modify-private playlist-modify-public',
            refreshToken: true, // automatically refreshes token
            customAuthorization: customAuthorizationLogic,
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if(account) {
                token.id = account.id;
                token.expires_at = account.expires_at;
                token.accessToken = account.access_token;
            }
            console.log('Token:', token);
            console.log('Scope:', token.scope);

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