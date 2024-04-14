'use client'
import React, { useState, useEffect, useContext }from "react";
import { PlayerContext } from "../contexts/PlayerContext";
import { useSession } from "next-auth/react";

// Define the onSpotifyWebPlaybackSDKReady function
/*window.onSpotifyWebPlaybackSDKReady = () => {
    console.log('Spotify Web Playback is ready!');
    handleSpotifyReady();
};*/

const onSpotifyWebPlaybackSDKReady = () => {
    console.log('Spotify Web Playback is ready!');
    handleSpotifyReady();
};

export const PlayerProvider = ({ children }) => {
    const { data: session } = useSession();
    const accessToken = session?.accessToken;

    const [player, setPlayer] = useState(null);
    const [deviceID, setDeviceID] = useState(null);
    const [playerState, setPlayerState] = useState(null);
    const [spotifyReady, setSpotifyReady] = useState(false);


    // Load Spotify Web Playback SDK script
    useEffect(() => {
        console.log('useEffect for script loading is triggered');

        if (typeof window !== 'undefined') {
            // Code that accesses the window object
            window.onSpotifyWebPlaybackSDKReady = () => {
                console.log('Spotify Web Playback is ready!');
                handleSpotifyReady();
            };
        }

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

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleSpotifyReady = () => {
        console.log('handleSpotifyReady function is executing');
        try {
            const newPlayer = new window.Spotify.Player({
                name: 'Flow Mode Player',
                getOAuthToken: cb => { cb(accessToken); }, // Directly pass token
            });

            setPlayer(newPlayer);
            //newPlayer.connect();

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

    useEffect(() => {
        // Set up Spotify SDK ready callback only once
        const setupSpotifySDKCallback = () => {
            if(window.Spotify && window.Spotify.Player) {
                handleSpotifyReady();
            } else {
                window.onSpotifyWebPlaybackSDKReady = handleSpotifyReady;
            }
        };

        if(spotifyReady && accessToken) {
            setupSpotifySDKCallback();
        }


        return () => {
            window.onSpotifyWebPlaybackSDKReady = null;
        };
    }, [spotifyReady, accessToken]);

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

    // Bundle up the context value with state variables and functions
    const contextValue = {
        player,
        deviceID,
        playerState,
        spotifyReady,
        initializePlayer,
    };


    return (
        <PlayerContext.Provider /*value={contextValue}*/
        value={{ contextValue }}>
            {children}
        </PlayerContext.Provider>
    );
};


export const usePlayer = () => useContext(PlayerContext);