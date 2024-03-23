import React, { useEffect, useState } from "react";

export default function Player({ accessToken }) {
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        // Load Spotify Web Playback SDK script
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
        document.body.appendChild(script);

        const handleSpotifyReady = () => {
            const newPlayer = new window.Spotify.Player({
                name: 'Your Music Player',
                getOAuthToken: cb => { cb(accessToken); }, // Directly pass token
            });

            setPlayer(newPlayer);

            newPlayer.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                // Perform actions when player is ready
            });

            newPlayer.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
                //Perform actions when player becomes not ready
            });
        };
            // Set up Spotify SDK ready callback
            window.onSpotifyWebPlaybackSDKReady = handleSpotifyReady;

            // Clean up
        return () => {
            document.body.removeChild(script);
            window.onSpotifyWebPlaybackSDKReady = null; // Remove callback when unmounting
        };
    }, []);


    useEffect(() => {
        // Initialize player when access token changes
        if(accessToken && player) {
            player.disconnect(); // Disconnect any existing player
            initializePlayer(accessToken);
        }
    }, [accessToken, player]);

    const initializePlayer = (accessToken) => {
        if(window.Spotify && window.Spotify.Player) {
              // Connect player
              player.connect();
        }
    };


    return (
        <div className="playerBackground">
            <h1 className="text-center">Work Mode</h1>
            <div className="p-24 bg-transparent rounded-md">
                <div className="p-16 m-8 bg-blue-600 rounded-full text-center">pomodoro circle/progress bar
                </div>
            <div className="flex justify-center border-black">
                <div className="flex px-32 justify-between border border-black border-opacity-100 bg-transparent rounded-l-lg">
                   {/* <button className="m-8 py-1 px-6 bg-blue-600">
                        <BackwardIcon />
                    </button>
                    <button className="m-8 py-1 px-6 bg-blue-600">
                        <PlayPauseIcon />
                    </button>
                    <button className="m-8 py-1 px-6 bg-blue-600">
                        <ForwardIcon />
    </button> */}
                </div>
                <div className="border border-black border-opacity-100 bg-transparent rounded-r-lg">
                    <button className="mt-8 py-1 px-6 bg-blue-600">Volume controls</button>
                </div>
            </div>
            </div>
        </div>
    )
}