import NextAuth from "next-auth/next";
import Providers from "next-auth/providers";

export default NextAuth ({
    providers: [
        Providers.Spotify({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async redirect(url, baseUrl) {
            return '/shelf';
        },
    },
});