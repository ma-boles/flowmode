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
            expiresAt: Date.now()/ 1000 + (response.data.expires_in * 1000),
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
            name: account.name,
            display_name: account.display_name,
            scope: account.scope,
            expiresAt: account.expires_at,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
        };

        // Check if access token is expired or about to expire
        if(tokens.expiresAt <= Date.now()/ 1000 + 60) {
            // Token is expired or about to expire, refresh it
            const refreshedTokens = await refreshTokens(account);
            // Update tokens with refreshed values
            tokens.accessToken = refreshedTokens.accessToken;
            tokens.expiresAt = refreshedTokens.expiresAt;
        }
        console.log('Tokens:', tokens);
        //console.log('Account:', account);
        return tokens;

    } catch(error) {
        console.error('Error getting tokens:', error.message);

        // Check for 401 Unauthorized error
        if(error.response && error.response.status === 401) {
            // Token is invalid or expired, attempt to refresh it
            console.log('Token is nvalid or expired, attempting refresh...');
            try {
                const refreshedTokens = await refreshTokens(account);
                // Update tokens with refreshed values
                tokens.accessToken = refreshTokens.accessToken;
                tokens.expiresAt = refreshTokens.expiresAt;
                console.log('Tokens refreshed successfully:', refreshedTokens);
                return refreshedTokens;
            } catch (refreshError) {
                console.error('Error refreshing tokens:', refreshError.message);
                throw refreshError;
            }
        }
        // Rethrow other errors
        throw error;
    }
};

const options = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            scope: 'user-read-email user-read-private playlist-read-private playlist-modify-private playlist-modify-public user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played streaming',
            authorization: "https://accounts.spotify.com/authorize?scope=user-read-email user-read-private playlist-read-private playlist-modify-private playlist-modify-public user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played streaming",
            refreshToken: true, // Automatically refreshes token
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account }) {
            if(account) {
                const tokens = await getTokens(account);
                token = {...token, ...tokens};

                //Fetch additional user info
                const response = await axios.get('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: `Bearer ${tokens.accessToken}`,
                    },
                });

                const user = response.data;
                token.id = user.id;
                token.display_name = user.display_name;
                token.email = user.email;
                token.picture = user.images?.[0]?.url || null;
            }
            console.log('Token:', token)
            return token;
        },
        async session({ session, token }) {
            session.user = {
                ...session.user,
                id: token.id,
                name:token.display_name,
                email: token.email,
                image: token.picture,
                //accessToken: token.accessToken,
                //refreshToken: token.refreshToken,
            };

            //token;
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;

            console.log('Session:', session);
            return session;
        },
    },
    //pages: {}
};

export { getTokens };
export default options;