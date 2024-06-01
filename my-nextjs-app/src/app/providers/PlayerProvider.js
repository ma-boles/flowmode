'use client'
import React, { useState, useEffect, useContext, useCallback, useRef }from "react";
import { PlayerContext } from "../contexts/PlayerContext";
import { useSession } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-node";
import makeApiRequest from "../lib/spotifyApi";


export const PlayerProvider = ({ children }) => {
    const { data: session } = useSession();
    const accessToken = session?.accessToken;

    /*const playerRef = useRef(null);*/
    const [player, setPlayer] = useState(null);
    const [deviceID, setDeviceID] = useState(null);
    const [playerState, setPlayerState] = useState(null);
    const [spotifyReady, setSpotifyReady] = useState(false);
    const [devices, setDevices] = useState([]);

    const loadSDK = useCallback(() => {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
       }, []);

    const removeSDKScript = useCallback(() => {
        const script = document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]');
        if(script) {
            script.remove();
        }
    }, []);

    const initializePlayer = useCallback((accessToken) => {
        console.log('Initializing player with access token:', accessToken);
        if(!window.Spotify) {
            console.error('Spotify SDK is not loaded');
            return;
        }

            const newPlayer = new window.Spotify.Player({
                name: 'Flow Mode Player',
                getOAuthToken: (cb) => {
                    console.log('Poviding token to Spotify Player:', accessToken);
                    cb(accessToken);
                },
                volume: 0.5
            });
    
            setPlayer(newPlayer);
    
            // Ready
            newPlayer.addListener('ready', ({ device_id }) => {
                console.log('Spotify player is ready for playback.');
                console.log('Device ID:', device_id);
                setDeviceID(device_id);
                // start playback or perform other actions here
            });
    
            newPlayer.addListener('player_state_changed', (state) => {
                console.log('Player state changed:', state);
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
            
            return () => {
                newPlayer.disconnect();
            };
    }, []);
    
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
    }, [accessToken, initializePlayer]);

    useEffect(() => {
        const loadSDKScript = async () => {
            try {
                await loadSDK();
                setSpotifyReady(true);
            } catch (error) {
                console.error('Failed to load Spotify SDK:', error);
            }
        };
    
        loadSDKScript();
    
        return () => {
            removeSDKScript();
        };
    }, [loadSDK, removeSDKScript]);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                if(!accessToken) {
                    throw new Error('Access token is missing');
                }
                const url = 'https://api.spotify.com/v1/me/player/devices';
                const data = await makeApiRequest(url, accessToken);
                setDevices(data.devices);
            } catch (error) {
                console.error('Error fetching devices:', error.message);
            }
        };
    
        fetchDevices();
    }, [accessToken]);

    const playItem = useCallback((uri) => {
        console.log(player);

        if (player) {
            player.togglePlay({ uris: [uri]})
            .then(() => {
                console.log('Item playback started:', uri);
            })
            .catch((error) => {
                console.error('Error playing item:', error);
            });
        } else {
            console.error('Player is not available.');
        }
       }, [player]);

/*
    const onSpotifyReady = useCallback(() => {
        console.log('Spotify Web Playback SDK is ready!');
        initializePlayer(accessToken);
    }, [accessToken]);

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
   }, [/*accessToken onSpotifyReady]);


   useEffect(() => {
    const loadSDKScript = async () => {
        try {
            await loadSDK();
            setSpotifyReady(true);
        } catch (error) {
            console.error('Failed to load Spotify SDK:', error);
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

   const loadSDK = useCallback(() => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
   }, []);

   const removeSDKScript = useCallback(() => {
    const script = document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]');
    if(script) {
        script.remove();
    }
   }, []);

   const initializePlayer = useCallback((accessToken) => {
    try {
        const newPlayer = new window.Spotify.Player({
            name: 'Flow Mode Player',
            getOAuthToken: (cb) => cb(accessToken),
            volume: 0.5
        });

        setPlayer(newPlayer);

        // Ready
        newPlayer.addListener('ready', ({ device_id }) => {
            console.log('Spotify player is ready for playback.');
            console.log('Device ID:', device_id);
            setDeviceID(device_id);
            // start playback or perform other actions here
        });

        newPlayer.addListener('player_state_changed', (state) => {
            console.log('Player state changed:', state);
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
   }, []);

   useEffect(() => {
    const fetchDevices = async () => {
        try {
            if(!accessToken) {
                throw new Error('Access token is missing');
            }
            const url = 'https://api.spotify.com/v1/me/player/devices';
            const data = await makeApiRequest(url, accessToken);
            setDevices(data.devices);
        } catch (error) {
            console.error('Error fetching devices:', error.message);
        }
    };

    fetchDevices();
   }, [accessToken]);

   const playItem = useCallback((uri) => {
    console.log(player);
    if (player) {
        player.togglePlay({ uris: [uri]})
        .then(() => {
            console.log('Item playback started');
        })
        .catch((error) => {
            console.error('Error playing item:', error);
        });
    } else {
        console.error('Player is not available.');
    }
   }, [player]);*/

    // Bundle up the context value with state variables and functions
    const contextValue = React.useMemo(() => ({
        player,
        deviceID,
        playerState,
        spotifyReady,
        initializePlayer,
        playItem,
    }), [player, deviceID, playerState, spotifyReady, initializePlayer, playItem]);


    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    );
};


export const usePlayer = () => React.useContext(PlayerContext);