import React, { useContext, useEffect, useState, useCallback } from "react";
import { usePlaylistContext } from "@/app/contexts/PlaylistContext";
import usePlayer from "@/app/hooks/usePlayer";
import { PlayerContext } from "@/app/providers/PlayerProvider";
import { useSession } from "next-auth/react";
import { playAlbum, playAudiobook, playEpisode, playSong } from "@/app/lib/playerApi";


export default function FlowTimer({ onRestEnd, onFlowEnd }) {
    const { data: session } = useSession();
    const accessToken = session?.accessToken;
    
    const { player } = useContext(PlayerContext);
    const { flowPlaylistName, restPlaylistName, flowPlaylistId, restPlaylistId } = usePlaylistContext();

    //const [flowPlaylistId, setFlowPlaylistId] = useState('');
    //const [restPlaylistId, setRestPlaylistId] = useState('');
    const [flowTracks, setFlowTracks] = useState([]);
    const [restTracks, setRestTracks] = useState([]);
    const [flowTime, setFlowTime] = useState('');
    const [restTime, setRestTime] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [activeInterval, setActiveInterval] = useState('flow');
    const [countdown, setCountdown] = useState(null);
    const [initialFlowTime, setInitialFlowTime] = useState('');
    const [initialRestTime, setInitialRestTime] = useState('');


    const handlePlayback = (itemType, uri) => {
        switch (itemType) {
            case 'playlist':
                playPlaylist(uri);
                console.log('Playing playlist:', uri);
                break;
            case 'track':
                playSong(uri);
                console.log('Playing track:', uri);
                break;
            case 'audiobook':
                playAudiobook(uri);
                console.log('Playing audiobook:', uri);
                break;
            case 'episode':
                playEpisode('Playing episode:', uri);
                break;
            case 'album':
                playAlbum('Playing album:', uri);
                break;
            default:
                console.warn('Unknown item type for playback', itemType);
                break;
        }
    };

         // Fetch tracks for playlists
         const fetchTracks = useCallback(async (playlistId, setTracks) => {
            try {
                console.log('Fetching tracks for playlist:', playlistId);
                const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
                if(!response.ok) {
                    throw new Error('Failed to fetch tracks');
                }
                const data = await response.json();
                const trackUris = data.items.map(item => item.track.uri);
                setTracks(trackUris);
                console.log('Fetched tracks:', trackUris);
            } catch (error) {
                console.error('Error fetching tracks:', error.message);
            }
        }, [accessToken]);

    // Fetch tracks for flow and rest playlists
    useEffect(() => {
        console.log('Flow playlist ID:', flowPlaylistId);
        console.log('Rest playlist ID:', restPlaylistId);

        if(flowPlaylistId) {
            fetchTracks(flowPlaylistId, setFlowTracks);
        }
        if(restPlaylistId) {
            fetchTracks(restPlaylistId, setRestTracks);
        }
    }, [flowPlaylistId, restPlaylistId, fetchTracks]);

    const playTracks = useCallback((tracks) => {
        if(player) {
            console.log('Playing tracks:', tracks);
            player.queue(tracks[0])
            .then(() => player.play())
            .catch(error => console.error('Error playing tracks:', error));
        } else {
            console.error('Player is not initialized');
        }
    }, [player]);

    const stopPlayback = useCallback(() => {
        if(player) {
            console.log('Pausing playback');
            player.pause()
            .catch(error => console.error('Error pausing playback:', error));
        } else {
            console.error('Player is not initialized');
        }
    }, [player]);

    // Play track from a playlist
    const playPlaylist = useCallback((playlistId) => {
        if(playlistId && player) {
            console.log('Playing playlist:', playlistId);
            fetchTracks(playlistId, (tracks) => {
                if(tracks.length > 0) {
                    playTracks(tracks);
                } else {
                    console.error('No tracks found in the playlist');
                }
            });
        } else {
            console.error('No playlist ID provided');
        }
    }, [fetchTracks, playTracks, player]);

    // Pause current playlist
    const pausePlaylist = useCallback(() => {
        if(player) {
            stopPlayback();
        } else {
            console.error('Player is not initialized');
        }
    }, [stopPlayback]);


    useEffect(() => {
        let intervalId = null;
        // Clear existing countdown when timers
        /*if(countdown) {
            clearInterval(countdown);
        }*/

        // Set up new countdown
        if(isActive) {
            /*setCountdown(*/
                intervalId = setInterval(() => {
                if(activeInterval === 'flow') {
                    if(flowTime > 0) {
                        setFlowTime((prevTime) => prevTime - 1);
                    } else {
                        // Flow interval is over, switch to rest interval
                        console.log('Switching to rest interval');
                        setActiveInterval('rest');
                        onFlowEnd();
                        pausePlaylist();
                        handlePlayback('playlist', restPlaylistId);
                        setFlowTime(initialFlowTime);
                        //clearInterval(intervalId);
                }
            } else if (activeInterval === 'rest') {
                if(restTime > 0) {
                    setRestTime((prevTime) => prevTime - 1);
                } else {
                    console.log('Switching to flow interval');
                    setActiveInterval('flow');
                    handlePlayback('playlist', flowPlaylistId);
                    onRestEnd();
                    pausePlaylist();
                    // Rest interval is over, switch to flow interval, playback does not trigger on reset
                    setRestTime(initialRestTime);
                    //clearInterval(intervalId);
                }
            }

            }, 1000)
        //);

    }

    return () => clearInterval(/*countdown*/ intervalId);
    }, [isActive, activeInterval, flowTime, restTime, initialFlowTime, initialRestTime, onRestEnd, onFlowEnd, playPlaylist, pausePlaylist]);

    const formatTime = (time) => {
        const minutes = Math.floor(time /60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0': ''}${seconds}`;
    };

    const toggleTimer = () => {
        //setIsActive(!isActive);
        setIsActive(prevIsActive => {
            if(!prevIsActive) {
                // Timer starting
                console.log('Starting timer with interval:', activeInterval);
                if(activeInterval === 'flow') {
                    console.log('Flow playlist ID:', flowPlaylistId);
                    playPlaylist(flowPlaylistId);
                } else if (activeInterval === 'rest') {
                    console.log('Rest playlist ID:', restPlaylistId);
                    playPlaylist(restPlaylistId);
                }
            } else {
                // Timer is pausing
                console.log('Pausing timer');
                pausePlaylist();
            }
            return !prevIsActive;
        })
    };

    const resetTimer = () => {
        setIsActive(false);
        setActiveInterval('flow');
        setFlowTime(initialFlowTime); // resets to default time
        setRestTime(initialRestTime); // resets to default time
        pausePlaylist();
    };

    const handleFlowTimeChange = (event) => {
        const newValue = Math.min(parseInt(event.target.value),60) * 60; // converts minutes to seconds
        setFlowTime(newValue);
        setInitialFlowTime(newValue);
    };

    const handleRestTimeChange = (event) => {
        const newValue = Math.min(parseInt(event.target.value), 60) * 60; // converts minutes to seconds
        setRestTime(newValue);
        setInitialRestTime(newValue);
    };


    return(
        <>
        <div /* flow div */ className={`mx-32 mt-16 mb-10 border border-solid border-gray-800 rounded-md transition-bg ${activeInterval === 'refresh' ? 'bg-blue-500' : 'bg-transparent'}`}>
            <div /* time div */ className="flex justify-evenly">
                <div className="p-16 mt-6">
                    <h2 className="font-bold text-2xl text-gray-200">FLOW</h2>
                    <h2 className="font-bold text-xl text-gray-400">{flowPlaylistName || '' }</h2>
                    {isActive ? (
                        <div /* flow time */ className="mt-6 mx-6 mb-2 bg-transparent font-bold text-7xl text-center">
                            {formatTime(flowTime)}
                        </div>
                    ) : (
                        <input className="mt-6 mx-6 bg-transparent text-6xl text-center"
                            type="number"
                            value={flowTime / 60}
                            onChange={handleFlowTimeChange}
                            min="1"
                            max="60"
                            placeholder="25"
                            />
                    )}

                </div>
                <div className="p-16 mt-6">
                    <h2 className="font-bold text-2xl text-gray-200">REST</h2>
                    <h2 className="font-bold text-xl text-gray-400">{restPlaylistName || ''}</h2>
                    {isActive ? (
                        <div /* refresh time */ className="mt-6 mx-6 mb-2 font-bold text-7xl text-center">
                            {formatTime(restTime)}
                        </div>
                    ) : (
                        <input className="mt-6 mx-6 bg-transparent text-6xl text-center"
                            type="number"
                            value={restTime / 60}
                            onChange={handleRestTimeChange}
                            min="1"
                            max="60"
                            placeholder="5"
                            />
                    )}
                </div>
            </div>
            <div /* buttons div */ className="flex justify-end mb-2 pr-6">
                <button className="px-8 py-2 m-2 bg-blue-600"onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
                <button className="px-8 py-2 m-2 bg-blue-600"onClick={resetTimer}>Reset</button>
            </div>
        </div>
        </>
    );
};