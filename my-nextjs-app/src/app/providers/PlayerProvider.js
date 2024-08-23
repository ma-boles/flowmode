'use client'
import React, { useState, useEffect, useContext, useCallback, createContext }from "react";
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
                reject(new Error('Failed to load Spotify SDK script.'));
            };

            document.body.appendChild(script);
        });
       }, []);

       /*
       // Load the Spotify SDK script
    const loadSDK = useCallback(() => {
        return new Promise((resolve, reject) => {
            // Check if the script is already present
            if(window.Spotify) {
                resolve();
            } else {
                const script = document.createElement("script");
                script.src = "https://sdk.scdn.co/spotify-player.js";
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            }
        });
       }, []); */

    // Remove the Spotify SDK script
    const removeSDKScript = useCallback(() => {
        const script = document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]');
        if(script) {
            script.remove();
        }
    }, []);

    // Initialize the Spotify player
    const initializePlayer = useCallback(async (accessToken) => {
        if(!window.Spotify) {
            console.error('Spotify SDK is not loaded');
            return;
        }

            const newPlayer = new window.Spotify.Player({
                name: 'Flow Mode Player',
                getOAuthToken: (cb) => {
                    //console.log('Poviding token to Spotify Player:', accessToken);
                    cb(accessToken);
                },
                volume: 0.5
            });

            // new code below
            const connectPlayer = () => {
                return new Promise((resolve, reject) => {
                    newPlayer.connect().then(success => {
                        if(success) {
                            console.log('The Web Playback SDK successfully connete to Spotify!');
                            resolve();
                        } else {
                            reject('Player connetion failed.');
                        }
                    });
                });
            };
            //

            // Ready
            const setUpEventListeners = () => {
            newPlayer.addListener('ready', ({ device_id }) => {
                console.log('Spotify player is ready for playback.');
                //console.log('Device ID:', device_id);
                setDeviceID(device_id);
                transferPlayback(device_id, accessToken); // transfer playback to SDK
            });
    
            newPlayer.addListener('player_state_changed', (state) => {
                if(!state) {
                    setActive(false);
                    return;
                }
                setPlayerState(state);
                setPaused(state.paused);
                //
                setActive(!state.paused);

                /*newPlayer.getCurrentState().then(currentState => {
                    if(currentState) {
                        setActive(true);
                    } else {
                        setActive(false);
                    }
                }).catch(error => {
                    console.error('Error getting current state:', error);
                });*/
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
        };
    
          /*  await newPlayer.connect().then(success => {
                if(success) {
                    console.log('The Web Playback SDK successfully connected to Spotify!');
                } else {
                    console.error('Player connection failed.');
                }
            });*/

            //setPlayer(newPlayer);
            // new code below
            try {
                setUpEventListeners();
                await connectPlayer();
                setPlayer(newPlayer);
            } catch(error) {
                console.error('Error during player initialization:', error);
            }
            //

            return () => {
                newPlayer.removeListener('player_state_changed');
                newPlayer.removeListener('ready');
                newPlayer.removeListener('not_ready');
                newPlayer.removeListener('initialization_error');
                newPlayer.removeListener('authentication_error');
                newPlayer.removeListener('account_error');
                newPlayer.removeListener('playback_error');
                newPlayer.disconnect();
            };
    }, [accessToken]);

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
        /*if(accessToken) {
            const onSpotifyReady = () => {
                if(accessToken) {
                    initializePlayer(accessToken);
                } else {
                    console.error('Access token is missing');
                }
            };*/
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


 /*React.useContext(PlayerContext);*/ /*playItem,*/ //playItem,
/*
// PlayerProvider component
export const PlayerProvider = ({ children }) => {
    const { data: session } = useSession();
    const accessToken = session?.accessToken;

    /*const playerRef = useRef(null);*//*
    const [player, setPlayer] = useState(null);
    const [deviceID, setDeviceID] = useState(null);
    const [playerState, setPlayerState] = useState({});
    const [active, setActive] = useState(false);
    const [paused, setPaused] = useState(false);
    const [spotifyReady, setSpotifyReady] = useState(false);
    const [flowPlaylistId, setFlowPlaylistId] = useState('');
    const [restPlaylistId, setRestPlaylistId] = useState('');
    const [flowTracks, setFlowTracks] = useState([]);
    const [restTracks, setRestTracks] = useState([]);
    const [devices, setDevices] = useState([]);

    const onDeviceIdChange = (newDeviceId) => {
        setDeviceID(newDeviceId);
    };

    useEffect(() => {
        if(deviceID) {
            console.log('Device ID:', deviceID);
        };
    }, [deviceID]);

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
        //console.log('Initializing player with access token:', accessToken);
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
    
            //setPlayer(newPlayer);
    
            // Ready
            newPlayer.addListener('ready', ({ device_id }) => {
                console.log('Spotify player is ready for playback.');
                console.log('Device ID:', device_id);
                setDeviceID(device_id);
                transferPlayback(device_id, accessToken); // transfer playback to SDK
            });
    
            newPlayer.addListener('player_state_changed', (state) => {
                if(!state) {
                    setActive(false);
                    return;
                }
                setPlayerState(state);
                setPaused(state.paused);

                newPlayer.getCurrentState().then(currentState => {
                    setActive(!!currentState);
                    //(!state) ? setActive(false) : setActive(true)
                }).catch(error => {
                    console.error('Error getting current state:', error);
                });
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
    
            newPlayer.connect().then(success => {
                if(success) {
                    console.log('The Web Playback SDK successfully connected to Spotify!');
                } else {
                    console.error('Player connection failed.');
                }
            });

            setPlayer(newPlayer);
            
            return () => {
                newPlayer.removeListener('Player_state_changed');
                newPlayer.removeListener('ready');
                newPlayer.removeListener('not_ready');
                newPlayer.removeListener('initialization_error');
                newPlayer.removeListener('authentication_error');
                newPlayer.removeListener('account_error');

                newPlayer.disconnect();
            };
    }, []);

    const transferPlayback = async (device_id, accessToken) => {
        try {
            const response = await fetch('https://api.spotify.com/v1/me/player', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    device_ids: [device_id],
                    play: true, //start playback
                }),
            });

            if(response.status === 204) {
                console.log('Playback transferred successfully');
            } else {
                console.error('Failed to transfer playback', response.status, response.statusText);
            }
        } catch(error) {
            console.error('Error transferring playback:', error)
        }
    };

    useEffect(() => {
        // Define onSpotifyReady callback
        const onSpotifyReady = () => {
            console.log('Spotify Web Playback SDK is ready!');
            if(accessToken) {
                initializePlayer(accessToken);
            } else {
                console.error('Access token is missing');
            }
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
                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if(!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                /*const data = await makeApiRequest(url, accessToken);*//*
                setDevices(data.devices);
            } catch (error) {
                console.error('Error fetching devices:', error.message);
            }
        };
        fetchDevices();
    }, [accessToken]);


    // flow mode code
    useEffect(() => {
        const fetchTracks = async (playlistId, setTracks) => {
            const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            const data = await response.json();
            const trackUris = data.items.map(item => item.track.uri);
            setTracks(trackUris);
        };

        if(flowPlaylistId) {
            fetchTracks(flowPlaylistId, setFlowTracks);
        }
        if(restPlaylistId) {
            fetchTracks(restPlaylistId, setRestTracks);
        }
    }, [accessToken, flowPlaylistId, restPlaylistId]);


    // flow mode controls
    const playPlaylist = (playlistId) => {
        if(playlistId) {
            fetchTracks(playlistId, (tracks) => playTracks(tracks));
        } else {
            console.error('No playlist ID provided');
        }
    };

    const pausePlaylist = () => {
        stopPlayback();
    };


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
        playPlaylist,
        pausePlaylist,
        setPlayerState,
        onDeviceIdChange
    }), [player, deviceID, playerState, spotifyReady, initializePlayer, setPlayerState, onDeviceIdChange, active, paused, flowTracks, restTracks, setFlowPlaylistId, setRestPlaylistId, playPlaylist, pausePlaylist
    ]);


    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    );
};*/