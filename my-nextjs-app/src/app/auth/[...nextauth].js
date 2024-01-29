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
        async session(session, user) {
            if(user) {
                session.id = user.id,
                session.accessToken = user.accessToken;
            }
            return session;
        },
    },
});