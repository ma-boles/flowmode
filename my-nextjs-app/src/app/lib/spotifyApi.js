/*import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

export default spotifyApi;

export const getAccessToken = async(code) => {
    const data = await spotifyApi.authorizationCodeGrant(code);
    return data.body['access_token'];
};*/

import { getTokens } from "../api/auth/[...nextauth]/options";
import axios from "axios";

const makeApiRequest = async(url, account) => {
    try {
        const tokens = await getTokens(account);

        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${tokens.accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        
        if(response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Error making API request: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error making API request:', error.message);
        throw error;
    }
};

export default makeApiRequest;