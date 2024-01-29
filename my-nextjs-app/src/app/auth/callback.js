import { getSession } from "next-auth/react";

const SpotifyCallbackPage = () => {
    //get the redirect uri from .env.local
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

    // get the user session
    const session = getSession();

    // check if the user is authenticated
    if(session) {
        // user is authenticated, redirect to the shelf page
        window.location.href = redirectUri;
    } else {
        // user is not authenticated, handle accordingly (redirect to login)
        window.location.href = '/login';    
    }

    // this page won't be rendered, as the use will be redirected

    return null;
};

export default SpotifyCallbackPage;