import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

export default spotifyApi;

export const getAccessToken = async(code) => {
    const data = await spotifyApi.authorizationCodeGrant(code);
    return data.body['access_token'];
};