'use client'
import React, { useState, useEffect, useContext, useCallback, createContext, useRef }from "react";
import { useSession } from "next-auth/react";

// create the context
export const PlayerContext = createContext();

// PlayerProvider component
export const PlayerProvider = ({ children }) => {
    const { data: session } = useSession();
    const accessToken = session?.accessToken;

    /*const playerRef = useRef(null);*/
    const [player, setPlayer] = useState(null); // Stores the player object
    const [playerState, setPlayerState] = useState({}); // Stores the playback state
    const [deviceID, setDeviceID] = useState(null);
    const [trackInfo, setTrackInfo] = useState(null);
    const [active, setActive] = useState(false);
    const [paused, setPaused] = useState(false);
    const [spotifyReady, setSpotifyReady] = useState(false);
    const [flowPlaylistId, setFlowPlaylistId] = useState('');
    const [restPlaylistId, setRestPlaylistId] = useState('');
    const [flowTracks, setFlowTracks] = useState([]);
    const [restTracks, setRestTracks] = useState([]);
    const [devices, setDevices] = useState([]);

    // Load the Spotify SDK script
    const loadSDK = useCallback(() => {
        return new Promise((resolve, reject) => {
            // Check if the script is already present
            if(window.Spotify) {
                resolve();
                return;
            }
            // Create and append the script tag
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;

            script.onload = () => {
                // Ensure the SDK is fully loaded
                if(window.Spotify) {
                    resolve();
                } else {
                    reject(new Error('Spotify SDK failed to load.'));
                }
            };

            script.onerror = () => {
                console.error('Failed to laod Spotify SDK script. Retrying... ');
                setTimeout(loadSDK, 5000); // Retry after 5 seconds
                reject(new Error('Failed to load Spotify SDK script.'));
            };

            document.body.appendChild(script);
        });
       }, []);

    // Remove the Spotify SDK script
    const removeSDKScript = useCallback(() => {
        const script = document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]');
        if(script) {
            script.remove();
        }
    }, []);

    // Initialize the Spotify player
    const initializePlayer = useCallback(async (accessToken) => {
        // Check if the Spotify SDK is loaded
        /*if(!window.Spotify) {
            console.error('Spotify SDK is not loaded');
            return;
        }*/

        // Check if the Spotify player already exists
        if(player) {
            console.warn('Spotify player already exists');
            return;
        }

        try {
        // Create a new instance of the Spotify player
        const newPlayer = new window.Spotify.Player({
            name: 'Flow Mode Player',
            getOAuthToken: (cb) => {
                cb(accessToken);
            },
            volume: 0.5
        });

        // Ensure the player object is correctly created before calling connect
        if(!newPlayer) {
           throw new Error('Failed to create the Spotify player');           
        }

        // Store the player instance
        window.spotifyPlayer = newPlayer;
        setPlayer(newPlayer);

            // Ready
            newPlayer.addListener('ready', ({ device_id }) => {
                console.log('Spotify player is ready for playback.');
                setDeviceID(device_id);
                transferPlayback(device_id, accessToken); // transfer playback to SDK
            });
     
            newPlayer.addListener('player_state_changed', (state) => {
                console.log('Player state changed:', state);
                if(!state) {
                    setPlayerState({});
                    return;
                }
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

            newPlayer.addListener('playback_error', ({ message }) => {
                console.error('Playbck error:', message);
            });

            // Connect to the player
            const success = await newPlayer.connect();
                if(success) {
                    console.log('The Web Plyback SDK successfully connected to Spotify');
                } else {
                    throw new Error('Player connection failed.');
                }

            return () => {
                if (newPlayer) {
                    newPlayer.removeListener('player_state_changed');
                    newPlayer.removeListener('ready');
                    newPlayer.removeListener('not_ready');
                    newPlayer.removeListener('initialization_error');
                    newPlayer.removeListener('authentication_error');
                    newPlayer.removeListener('account_error');
                    newPlayer.removeListener('playback_error');
                    newPlayer.disconnect();
                }
            };
        } catch (error) {
            console.error('Error during player connection:', error);
        }
    }, [accessToken, transferPlayback, player]);


    // Transfer playback to the Web Playback SDK
    const transferPlayback = useCallback(async (device_id, accessToken) => {
        try {
            const response = await fetch('https://api.spotify.com/v1/me/player', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    device_ids: [device_id],
                    play: true
                })
            });

            if (response.ok) {
                console.log('Playback transferred successfully');
            } else {
                console.error('Failed to transfer playback', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error transferring playback:', error);
        }
    }, []);

    // Fetch available devices
    const fetchDevices = useCallback(async () => {
        if (!accessToken) {
            console.error('Access token is missing');
            return;
        }
        try {
            const response = await fetch('https://api.spotify.com/v1/me/player/devices', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Devices fetched:', data);

            if(!data || data.devices.length === 0) {
                console.error('No active devices found.')
            } else {
                setDevices(data.devices);
            }

            return data;

        } catch (error) {
            console.error('Error fetching devices:', error.message);
        }
    }, [accessToken]);

    // initialize SDK and set up the player
    useEffect(() => {
        if (accessToken) {
            const onSpotifyReady = () => {
                initializePlayer(accessToken);
           };

            window.onSpotifyWebPlaybackSDKReady = onSpotifyReady;

            loadSDK()
                .then(() => setSpotifyReady(true))
                .catch(error => console.error('Failed to load Spotify SDK:', error));
            return () => {
                removeSDKScript();
                delete window.onSpotifyWebPlaybackSDKReady;
            };
        } else {
            console.error('Access token is missing');
        }
    }, [accessToken, initializePlayer, loadSDK, removeSDKScript]);

    // Fetch devices when accessToken changes
    useEffect(() => {
        fetchDevices();
    }, [accessToken, fetchDevices]);

    const onDeviceIdChange = useCallback((newDeviceId) => {
        setDeviceID(newDeviceId);
    }, []);


    // Bundle up the context value with state variables and functions
    const contextValue = React.useMemo(() => ({
        player,
        deviceID,
        playerState,
        spotifyReady,
        initializePlayer,
        paused,
        active,
        flowTracks,
        restTracks,
        setFlowPlaylistId,
        setRestPlaylistId,
        flowPlaylistId,
        restPlaylistId,
        setPlayerState,
        trackInfo,
        setTrackInfo,
        fetchDevices,
        onDeviceIdChange
    }), [player, deviceID, playerState, spotifyReady, initializePlayer, setPlayerState, onDeviceIdChange, fetchDevices, active, paused, flowTracks, restTracks, setFlowPlaylistId, setRestPlaylistId, trackInfo, flowPlaylistId, restPlaylistId
    ]);


    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    );
};