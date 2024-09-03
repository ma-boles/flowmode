import SpotifyProvider from "next-auth/providers/spotify";
import axios from "axios";

// Define constants for API URLs and headers
const SPOTIFY_API_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_ME_URL = 'https://api.spotify.com/v1/me';
const SPOTIFY_AUTH_HEADER = `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`;

// Function to refresh access token
const refreshAccessToken = async (token) => {
    try {
      const response = await axios.post(SPOTIFY_API_TOKEN_URL, null, {
        params: {
          grant_type: 'refresh_token',
          refresh_token: token.refreshToken, // Use the correct property name for the refresh token
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: SPOTIFY_AUTH_HEADER,
        },
      });
  
      const refreshedTokens = response.data; // Corrected the spelling error
  
      return {
        ...token,
        accessToken: refreshedTokens.access_token,
        accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000, // Corrected the spelling error
        refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fixed the variable name
      };
    } catch (error) {
      console.error('Error refreshing token:', error.response?.data || error.message);
  
      return {
        ...token,
        error: 'RefreshAccessTokenError',
      };
    }
  };
  
// Function to get tokens and refresh if needed
const getTokens = async (account) => {
    try {
        let tokens = {
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
            tokens = await refreshAccessToken(account);
        }
        //console.log('Tokens:', tokens);
        //console.log('Account:', account);
        return tokens;

    } catch(error) {
        console.error('Error getting tokens:', error.message);

        // Check for 401 Unauthorized error
        if(error.response && error.response.status === 401) {
            // Token is invalid or expired, attempt to refresh it
            console.log('Token is nvalid or expired, attempting refresh...');
            return await refreshAccessToken(account);
        }
        // Rethrow other errors
        throw error;
    }
};

// NextAuth configuration
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
                const response = await axios.get(SPOTIFY_API_ME_URL, {
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
            //console.log('Token:', token)
            return token;
        },
        async session({ session, token }) {
            session.user = {
                ...session.user,
                id: token.id,
                name: token.display_name,
                email: token.email,
                image: token.picture,
                //accessToken: token.accessToken,
                //refreshToken: token.refreshToken,
            };

            //token;
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;

            //console.log('Session:', session);
            return session;
        },
    },
    //pages: {}
};

export { getTokens };
export default options;