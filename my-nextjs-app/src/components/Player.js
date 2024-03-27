import React, { useEffect, useState } from "react";

export default function Player({ accessToken }) {
    const [player, setPlayer] = useState(null);
    const [deviceID, setDeviceID] = useState(null);
    const [playerState, setPlayerState] = useState(null);
    const [spotifyReady, setSpotifyReady] = useState(false);

    useEffect(() => {
        console.log('useEffect for script loading is triggered');
        console.log('spotifyReady:', spotifyReady);
        // Load Spotify Web Playback SDK script
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
        document.body.appendChild(script);

        // Error handling for script loading
        script.onerror = () => {
            console.error('Failed to load Spotify Web Playback SDK script');
            retryLoadScript();
        };

        // Implement retry logic if script loading fails
        const retryLoadScript = () => {
            // Retry after certain interval
            setTimeout(() => {
                document.body.appendChild(script);
            }, 3000); // Retry after 3 seconds
        };

        script.onload = () => {
            console.log('Spotify Web Playback SDK script loaded successfully');
            handleSpotifyReady();
            setSpotifyReady(true);
        };

    const handleSpotifyReady = () => {
        console.log('handleSpotifyReady function is executing');
        try {
            const newPlayer = new window.Spotify.Player({
                name: 'Your Music Player',
                getOAuthToken: cb => { cb(accessToken); }, // Directly pass token
            });

            setPlayer(newPlayer);

            newPlayer.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                // Perform actions when player is ready
                setDeviceID(device_id); // Update device ID state
            });

            newPlayer.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
                //Perform actions when player becomes not ready
                setDeviceID(null); // Reset device ID state
            });

            newPlayer.addListener('player_state_changed', (state) => {
                console.log('Player state changed:', state);
                // Log current playback state, track details, ect
                setPlayerState(state);
            });

            newPlayer.addListener('authentication_error', ({message}) => {
                console.log('Authentication error', message);
                // Log authentication errors
            });

            newPlayer.connect();
            console.log('Player connected.');

        } catch (error) {
            console.error('Error initializing Spotify player:', error);
        }
    };

        // Set up Spotify SDK ready callback only once
        const setupSpotifySDKCallback = () => {
            if(window.Spotify && window.Spotify.Player) {
                handleSpotifyReady();
            } else {
                window.onSpotifyWebPlaybackSDKReady = handleSpotifyReady;
            }
        };

        setupSpotifySDKCallback();

        // Clean up
        return () => {
            if(player) {
                player.disconnect();
                // Set the player state to null to inidicate that it's disconnected
                setPlayer(null);
            }
            document.body.removeChild(script);
            window.onSpotifyWebPlaybackSDKReady = null; // Remove callback when unmounting
        };
    }, [accessToken]);


    useEffect(() => {
        // Initialize player when access token changes
        if(accessToken && player && playerState) {
            player.disconnect(); // Disconnect any existing player
            initializePlayer(accessToken);
        }
    }, [accessToken, playerState]);

    const initializePlayer = (accessToken) => {
        console.log('Initializing player...');
        if(window.Spotify && window.Spotify.Player) {
              // Connect player
              player.connect();
              console.log('Player connected.');
        }
    };


    return (
        <div className="playerBackground">
            <h1 className="text-center">Work Mode</h1>
            <div className="p-24 bg-transparent rounded-md">
                <div className="p-16 m-8 bg-blue-600 rounded-full text-center">
                    Progress Bar
                </div>
            <div className="flex justify-center border-black">
                <div className="flex px-32 justify-between border border-black border-opacity-100 bg-transparent rounded-l-lg">
                    <button className="m-8 py-1 px-6 bg-blue-600">
                        Back
                    </button>
                    <button className="m-8 py-1 px-6 bg-blue-600">
                        Play
                    </button>
                    <button className="m-8 py-1 px-6 bg-blue-600">
                        Foward
                    </button>
                </div>
                <div className="border border-black border-opacity-100 bg-transparent rounded-r-lg">
                    <button className="mt-8 py-1 px-6 bg-blue-600">
                        Volume
                    </button>
                </div>
            </div>
            </div>
        </div>
    )
}