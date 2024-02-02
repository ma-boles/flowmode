import NextAuth from "next-auth/next";
import Providers from "next-auth/providers";

export default NextAuth ({
    providers: [
        Providers.Spotify({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            redirectUri: 'https://localhost:3000/api/auth/callback/spotify',
        }),
    ],
    callbacks: {
        async redirect(url, baseUrl) {
            // log the redirect info 
            console.log('Redirecting to:', url);

            // redirect logic
            return Promise.resolve('/shelf');
        },
    },
});