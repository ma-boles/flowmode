import NextAuth from "next-auth/next";
import Providers from "next-auth/providers";

export default NextAuth ({
    providers: [
        Providers.Spotify({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            redirectUri: '/api/auth/callback/spotify',
        }),
    ],
    callbacks: {
        async redirect(url, baseUrl) {
            // redirect logic
            return Promise.resolve('/api/auth/spotify');
        },
    },
});