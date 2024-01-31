import { encodeVerifier, encodeChallenge } from 'pkce-challenge';
import { providers } from 'next-auth/providers';


const generatePkcePair = () => {
    const verifier = encodeVerifier();
    const challenge = encodeChallenge(verifier);
    return { verifier, challenge };
};

export default providers.Spotify({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    state: true,
    pkce: true,
    authorizationUrl: 'https://accounts.spotify.com/authorize',
    pkceMethod: 'S256',
    getAuthorizationUrl: (params) => {
        const pkcePair = generatePkcePair();
        return {
            ...params,
            code_challenge: pkcePair.challenge,
            code_challenge_method: 'S256',
            code_verifier: pkcePair.verifier,
        };
    },
});