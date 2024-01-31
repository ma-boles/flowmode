import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { generatePkcePair } from "./spotify";
import axios from "axios";


export default async function Callback({ query }) {
    const router = useRouter();
    const session = await getSession();

    if(session) {
        // user is authenticated, redirect them to shelf page
        console.log('User is authenticated. Redirecting to /shelf');
        router.push('/shelf');
        return null;
    }

    const { code } = query;

    if(!code) {
        // handle error: authorization code not found in query parameters
        return <>Error: Authorization code not found</>;
    }

    // use the imported generatePkePair function 
    const pkcePair = generatePkcePair();

    // exchange authorization code for access token
    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            {
                code,
                grant_type: 'authorization_code',
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
                client_id: process.env.SPOTIFY_CLIENT_ID,
                client_secret: process.env.SPOTIFY_CLIENT_SECRET,
                code_verifier: pkcePair.verifier,
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const { access_token, refresh_token, expires_in } = response.data;

        // handle the obtained token as needed

        return <>Authentication successful</>;

    } catch (error) {
        console.error('Error exchanging authorization code for access token:', error);
        return <>Error exchanging authorization code for access token</>;
    }
}