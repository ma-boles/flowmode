import { signIn } from 'next-auth/react';

const SpotifyAuthPage = () => {
    // trigger spotify authentication
    signIn('spotify');

    //this page won't be rendered since use will be redirected to spotify

    return null;
};

export default SpotifyAuthPage;
