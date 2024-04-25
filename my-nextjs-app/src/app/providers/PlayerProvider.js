'use client'
import React, { useState, useEffect, useContext }from "react";
import { PlayerContext } from "../contexts/PlayerContext";
import { useSession } from "next-auth/react";
import { resolve } from "styled-jsx/css";


export const PlayerProvider = ({ children }) => {
    const { data: session } = useSession();
    const accessToken = session?.accessToken;

    const [player, setPlayer] = useState(null);
    const [deviceID, setDeviceID] = useState(null);
    const [playerState, setPlayerState] = useState(null);
    const [spotifyReady, setSpotifyReady] = useState(false);

   useEffect(() => {
    // Define onSpotifyReady callback
    const onSpotifyReady = () => {
        console.log('Spotify Web Playback SDK is ready!');
        initializePlayer(accessToken);
    };

    // Set onSpotifyWebPlaybackSDKReady callback
    window.onSpotifyWebPlaybackSDKReady = onSpotifyReady;

    // Clean up event listener when component unmounts
    return () => {
        delete window.onSpotifyWebPlaybackSDKReady;
    };
   }, [accessToken]);


   useEffect(() => {
    const loadSDKScript = async () => {
        try {
            await loadSDK();
            setSpotifyReady(true);
        } catch (error) {
            console.error('Failed to laod Spotify SDK:', error);
        }
    };

    loadSDKScript();

    return () => {
        removeSDKScript();
    };
   }, []);

   useEffect(() => {
        if (accessToken && spotifyReady) {
            initializePlayer(accessToken);
        }
   }, [accessToken, spotifyReady]);

   const loadSDK = () =>{
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
   };

   const removeSDKScript = () => {
    const script = document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]');
    if(script) {
        script.remove();
    }
   };

   const initializePlayer = (accessToken) => {
    try {
        const newPlayer = new window.Spotify.Player({
            name: 'Flow Mode Player',
            getOAuthToken: (cb) => cb(accessToken),
        });

        setPlayer(newPlayer);

        // Ready
        newPlayer.addListener('ready', ({ device_id}) => {
            console.log('Spotify player is ready for playback.');
            console.log('Device ID:', device_id);
            setDeviceID(device_id);
            // start playback or perform other actions here
        });

        newPlayer.addListener('player_state_changed', (state) => {
            console.og('Player state changed:', state);
            setPlayerState(state);
        });

        // Not ready
        newPlayer.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id)
        });

        newPlayer.addListener('initialization_error', ({ message }) => {
            console.log('Initializtion error:', message);
        });

        newPlayer.addListener('authentication_error', ({ message}) => {
            console.log('Authentication error:', message);
        });

        newPlayer.addListener('account_error', ({ message}) => {
            console.log('Account error:', message);
        });

        newPlayer.connect();
    } catch (error) {
        console.error('Error initializing Spotify player:', error)
    }
   };

    // Bundle up the context value with state variables and functions
    const contextValue = React.useMemo(() => ({
        player,
        deviceID,
        playerState,
        spotifyReady,
        initializePlayer,
    }), [player, deviceID, playerState, spotifyReady]);


    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    );
};


export const usePlayer = () => React.useContext(PlayerContext);





 // Load Spotify Web Playback SDK script
    {/*useEffect(() => {
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
*/}