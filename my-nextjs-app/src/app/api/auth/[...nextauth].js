import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";

export const {
    handlers,
    auth, 
    signIn,
    signOut
} = NextAuth({
    providers: [
        SpotifyProvider({
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

/*
export default NextAuth ({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async redirect(url, baseUrl) {
            return '/shelf';
        },
    },
});*/