import SpotifyProvider from "next-auth/providers/spotify";

const options = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            scopes: 'user-read-private playlist-read-private playlist-modify-private playlist-modify-public'
        }),
    ],
};

export default options;