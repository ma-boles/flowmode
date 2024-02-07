import SpotifyProvider from "next-auth/providers/spotify";

const options = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET
        }),
    ],
};

export default options;