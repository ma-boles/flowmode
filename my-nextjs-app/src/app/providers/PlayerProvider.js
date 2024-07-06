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
    const [playerState, setPlayerState] = useState({});
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
    
            setPlayer(newPlayer);
    
            // Ready
            newPlayer.addListener('ready', ({ device_id }) => {
                console.log('Spotify player is ready for playback.');
                console.log('Device ID:', device_id);
                setDeviceID(device_id);
                transferPlayback(device_id, accessToken); // transfer playback to SDK
            });
    
            newPlayer.addListener('player_state_changed', (state) => {
                if(state && state.device_id) {
                    console.log('Player state changed:', state);
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
    
            newPlayer.connect();
            
            return () => {
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
                /*const data = await makeApiRequest(url, accessToken);*/
                setDevices(data.devices);
            } catch (error) {
                console.error('Error fetching devices:', error.message);
            }
        };
        fetchDevices();
    }, [accessToken]);

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

    const playTracks = (tracks) => {
        fetch(`https://api.spotify.com/v1/me/player/play`, {
            method: 'PUT',
            body: JSON.stringify({ uris: tracks }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).catch(error => console.error('Error playing tracks:', error));
    };

    const stopPlayback = () => {
        fetch(`https://api.spotify.com/v1/me/player/pause`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).catch(error => console.error('Error stopping playback:', error));
    }

    // player controls
    const play = async () => {
        if(!player || !deviceID) return;
        await player.resume().catch(error => console.error('Failed to resume playback', error));
    };

    const pause = async() => {
        if(!player) return;
        await player.pause().catch(error => console.error('Failed to pause playback', error));
    };

    const next = async () => {
        if(!player) return;
        await player.nextTrack().catch(error => console.error('Failed to skip to next track', error));
    };

    const previous = async () => {
        if(!player) return;
        await player.previousTrack().catch(error => console.error('Failed to skip to previous track', error));
    };

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
        play,
        pause,
        next,
        previous,
        playTracks,
        stopPlayback,
        flowTracks,
        restTracks,
        setFlowPlaylistId,
        setRestPlaylistId,
        playPlaylist,
        pausePlaylist,
        //playItem,
        setPlayerState,
        onDeviceIdChange
    }), [player, deviceID, playerState, spotifyReady, initializePlayer, /*playItem,*/ setPlayerState, onDeviceIdChange, play, pause, next, previous, playTracks, stopPlayback, flowTracks, restTracks, setFlowPlaylistId, setRestPlaylistId
    ]);


    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    );
};


export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if(!context) {
        throw new Error('usePlayer must be used within PlayerProvider');
    }
    return context;
};/*React.useContext(PlayerContext);*/


/*const playItem = useCallback((uri) => {
        console.log('Attempting to play item with URI:', uri);
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
       }, [player]);*/