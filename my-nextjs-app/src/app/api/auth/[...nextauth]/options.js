import SpotifyProvider from "next-auth/providers/spotify";
import axios from "axios";


const refreshTokens = async(account) => {
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', null, {
            params: {
                grant_type: 'refresh_token',
                refresh_token: account.refresh_token,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Authorization': 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
            },
        });
        return {
            accessToken: response.data.access_token,
            expiresAt: Date.now()/ 1000 + response.data.expires_in,
        };
    } catch(error) {
        console.error('Error refreshing token:', error.response?.data || error.message);
        throw error;
    }
};

const getTokens = async (account) => {
    try {
        const tokens = {
            id: account.id,
            expiresAt: account.expires_at,
            accessToken: account.access_token,
            scope: account.scope,
            refreshToken: account.refresh_token,
        };
        // If access token is about to expire, refresh it
        if(account && account.refresh_token && tokens.expiresAt > Date.now()/ 1000 + 60) {
            const refreshedTokens = await refreshTokens(account);
            tokens.accessToken = refreshedTokens.accessToken;
            tokens.expiresAt = refreshedTokens.expiresAt;
        }
        console.log('Toekns;', tokens);
        return tokens;
    } catch(error) {
        console.error('Error getting tokens:', error.message);
        throw error;
    }
};

const options = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            scope: 'user-read-email user-read-private playlist-read-private playlist-modify-private playlist-modify-public',
            authorization: "https://accounts.spotify.com/authorize?scope=user-read-email user-read-private playlist-read-private playlist-modify-private playlist-modify-public",
            refreshToken: true, // Automatically refreshes token
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account }) {
            // if the access token is about to expire, refresh it
            if(account && account.refresh_token && token.exp > Date.now() / 1000 + 60) {
                try {
                    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
                        params: {
                            grant_type: 'refresh_token',
                            refresh_token: account.refresh_token,
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded', 
                            'Authorization': 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
                        },
                    });

                    token.accessToken = response.data.access_token;
                    token.exp = Date.now() / 1000 + response.data.expires_in;
                } catch (error) {
                    console.error('Error refreshing token:', error.response?.data || error.message);
                }
            }
            
            if(account) {
                token.id = account.id;
                token.expires_at = account.expires_at;
                token.accessToken = account.access_token;
                token.scope = account.scope;
                token.refreshToken = account.refresh_token;
            }
            console.log('Token:', token);

            return token;
        },
        async session({ session, token }) {
            // send properties to the client, access_token and user id fro provider
            session.user = token;
            session.accessToken = token.accessToken;

            return session;
        }
    },
    // pages: {}
};

export { getTokens };
export default options;