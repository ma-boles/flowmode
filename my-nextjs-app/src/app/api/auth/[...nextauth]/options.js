import SpotifyProvider from "next-auth/providers/spotify";
import { customAuthorizationLogic } from "@/app/lib/auth";

const options = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            scopes: 'user-read-private playlist-read-private playlist-modify-private playlist-modify-public'
        }),
    ],
    callbacks: {
        async jwt(token, user) {
            // include custom authorization logic
            return customAuthorizationLogic(token, user);
        },
    },
};

export default options;