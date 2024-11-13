import React, { useContext, useEffect, useState, useCallback } from "react";
import { usePlaylistContext } from "@/app/contexts/PlaylistContext";
import usePlayer from "@/app/hooks/usePlayer";
import { PlayerContext } from "@/app/providers/PlayerProvider";
import { useSession } from "next-auth/react";
import { playAlbum, playAudiobook, playEpisode, playSong, playPlaylist, stopPlayback, resumePlayback } from "@/app/lib/playerApi";


export default function FlowTimer() {
    const { data: session } = useSession();
    const accessToken = session?.accessToken;

    const { player } = useContext(PlayerContext);
    const { flowPlaylistName, restPlaylistName, flowPlaylistId, restPlaylistId } = usePlaylistContext();

    const [flowTracks, setFlowTracks] = useState([]);
    const [restTracks, setRestTracks] = useState([]);
    const [flowTime, setFlowTime] = useState('');
    const [restTime, setRestTime] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [activeInterval, setActiveInterval] = useState('flow');
    const [countdown, setCountdown] = useState(null);
    const [initialFlowTime, setInitialFlowTime] = useState('');
    const [initialRestTime, setInitialRestTime] = useState('');
    const [tracks, setTracks] = useState([]);
    const [initialCycleCount, setInitialCycleCount] = useState(1);
    const [cycleCount, setCycleCount] = useState(initialCycleCount);
    const [currentCycleCount, setCurrentCycleCount] = useState(0);
    const [mostRecentFlowPlaylist, setMostRecentFlowPlaylist]= useState(null);
    const [mostRecentRestPlaylist, setMostRecentRestPlaylist] = useState(null);

    const handlePlayback = async (itemType, uri, accessToken) => {
        try {
        switch (itemType) {
            case 'playlist':
                await playPlaylist(uri, accessToken);
                console.log('Playing playlist:', uri);
                break;
            case 'track':
                await playSong(uri, accessToken);
                console.log('Playing track:', uri);
                break;
            case 'audiobook':
                await playAudiobook(uri, accessToken);
                console.log('Playing audiobook:', uri);
                break;
            case 'episode':
                await playEpisode(uri, accessToken);
                console.log('Playing episode:', uri)
                break;
            case 'album':
                await playAlbum(uri, accessToken);
                console.log('Playing album:', uri)
                break;
            default:
                console.warn('Unknown item type for playback', itemType);
                break;
        }
    } catch (error) {
        console.error(`Error playing ${itemType} with uri ${uri}`, error);
    }
    };

         // Fetch tracks for playlists
         const fetchTracks = useCallback(async (playlistId, callback) => {
            try {
                console.log('Fetching tracks for playlist:', playlistId);
                const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if(!response.ok) {
                    throw new Error('Failed to fetch tracks');
                }
                const data = await response.json();
                const trackUris = data.items.map(item => item.track.uri);
                callback(trackUris);
                console.log('Fetched tracks:', trackUris);
            } catch (error) {
                console.error('Error fetching tracks:', error.message);
            }
        }, [accessToken]);

    // Fetch tracks for flow and rest playlists
    useEffect(() => {
        if(flowPlaylistId) {
            fetchTracks(flowPlaylistId, setFlowTracks);
        }
        if(restPlaylistId) {
            fetchTracks(restPlaylistId, setRestTracks);
        }
    }, [flowPlaylistId, restPlaylistId, fetchTracks]);

    const playTracks = useCallback(async (tracks) => {
        if(player && accessToken) {
            try {
                console.log('Playing tracks:', tracks);
                // Use spotify API to start playback with given track Uris
                await fetch('https://api.spotify.com/v1/me/player/play', {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        uris: tracks,
                    }),
                });
                console.log('Playback started successfully');
            } catch (error) {
                console.error('Error playing tracks:', error);
            }
        } else {
            console.error('Player is not initialized or no access token provided.');
        }
    }, [player]);

    // Play tracks from playlist
    const playFlowRest = useCallback(async (playlistId) => {
        if (playlistId) {
            const playlistUri = `spotify:playlist:${playlistId}`;
            console.log('Playing playlist:', playlistId);
            try {
                await playPlaylist(playlistUri, accessToken);
            } catch (error) {
                console.error('Error fetching or playing tracks:', error);
            }
        } else {
            console.error('No playlist ID provided');
        }
    }, [fetchTracks, playTracks, playPlaylist, accessToken]);

    // Pause current playlist
    const pausePlaylist = useCallback(() => {
        if(player) {
            console.log('Pausing playback');
            stopPlayback(accessToken);
        } else {
            console.error('Player is not initialized');
        }
    }, [player]);

    const resumePlaylist = useCallback(() => {
        if(player) {
            console.log('Resuming playback');
            resumePlayback(accessToken);
        } else {
            console.error('Player is not initialized');
        }
    }, [player]);

    // Manages countdown and interval changes
    useEffect(() => {
        let intervalId = null;

        if (isActive)  {
            intervalId = setInterval(() => {
                if (activeInterval === 'flow') {
                    if (flowTime > 0) {
                        setFlowTime(prevTime => prevTime - 1);
                    } else {
                        // Flow interval is over, switch to rest interval
                        console.log('Switching to rest interval');
                        pausePlaylist();
                        setActiveInterval('rest');
                        setMostRecentFlowPlaylist({ 
                            id: flowPlaylistId, 
                            name: flowPlaylistName 
                        });
                        playFlowRest(restPlaylistId, accessToken); // Start rest playlist
                        setFlowTime(initialFlowTime);
                    }
                } else if (activeInterval === 'rest') {
                    if (restTime > 0) {
                        setRestTime(prevTime => prevTime - 1);
                    } else {
                        if(currentCycleCount + 1 < cycleCount){
                            // Rest interval is over, switch to flow interval
                            console.log('Switching to flow interval');
                            pausePlaylist();
                            setActiveInterval('flow');
                            setMostRecentRestPlaylist({
                                id: restPlaylistId,
                                name: restPlaylistName
                            });
                            playFlowRest(flowPlaylistId, accessToken); // Start flow playlist
                            setCurrentCycleCount(prevCount => prevCount + 1);
                            setRestTime(initialRestTime);
                        } else {
                                // All intervals complete, stop playback
                                console.log('All intervals complete');
                                pausePlaylist();
                                setIsActive(false); // Stop timer

                                // Update MongoDB with most recent flow, rest, time info
                                updateRecentlyPlayed(
                                    flowPlaylistName,
                                    restPlaylistName
                                );
                        }
                    }
                }
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isActive, activeInterval, flowTime, restTime, initialFlowTime, initialRestTime, playPlaylist, accessToken, flowPlaylistId, restPlaylistId, currentCycleCount, cycleCount]);

    const formatTime = (time) => {
        const minutes = Math.floor(time /60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0': ''}${seconds}`;
    };

    // Toggles timer and starts/stops and triggers playback based on activeinterval
    const toggleTimer = () => {
        setIsActive(prevIsActive => {
            if(!prevIsActive) {
                console.log('Starting timer with interval:', activeInterval);
                playFlowRest(activeInterval === 'flow' ? flowPlaylistId : restPlaylistId, accessToken); // Start playlist based on active interval
            } else {
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

    const handleCycleCountChange = (event) => {
        const newValue = Math.max(1, Math.min(parseInt(event.target.value), 10)); // Ensure the value falls in range
        setCycleCount(newValue);
        setInitialCycleCount(newValue);
    };

    //Function to update MongoDB with recently played info
    async function updateRecentlyPlayed(flowPlaylistName, restPlaylistName) {

        // Validate playlist names before sending request
        if(!flowPlaylistName || !restPlaylistName) {
            console.error('Flow or Rest playlist name is missing.');
            return;
        }

        try {
            const response = await fetch('/api/update-recentlyplayed', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    flowPlaylistName,
                    restPlaylistName
                }),
            });

            if(!response.ok) {
                throw new Error('Failed to update recently played info');
            }

            const result = await response.json();
            console.log('Update successful:', result);
            console.log('Sending playlist name info:', flowPlaylistName, restPlaylistName);
        } catch(error) {
            console.error('Error updating recently played info', error);
        }
    };

    const clearAll = () => {
        setIsActive(false);
        setFlowTime(0);
        setRestTime(0);
        setCycleCount(0);
    };

    const saveTemplate = () => {
        alert('Save Template')
    };


    return(
        <>
        <div /* flow div */ className={`mx-32 mt-36 mb-10 border border-solid border-gray-800 rounded-md transition-bg ease-in-out delay-150 ${activeInterval === 'rest' ? 'bg-blue-500' : 'bg-black'}`}>
            <div /* time div */ className="flex mt-6">
                <div className="p-16 w-2/5 border-r ">
                    <h2 className="mt-6 font-bold text-2xl text-gray-200">FLOW</h2>
                    <h2 className="font-bold text-xl text-gray-400">{flowPlaylistName || 'Select a playlist, album, podcast, audiobook or track' }</h2>
                    {isActive ? (
                        <div /* flow time */ className="mt-6 mx-6 bg-transparent font-bold text-7xl text-center">
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

                <div className="p-16 w-2/5 ">
                    <h2 className="mt-6 font-bold text-2xl text-gray-200">REST</h2>
                    <h2 className="font-bold text-xl text-gray-400">{restPlaylistName || 'Select a playlist, album, podcast, audiobook or track'}</h2>
                    {isActive ? (
                        <div /* rest time */ className="mt-6 mx-6 font-bold text-7xl text-center">
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

                <div className="my-auto mr-8 py-4 w-1/5 h-1/4 bg-white bg-opacity-5 rounded-md">
                    <h2 className="py-2 font-bold text-2xl"># of Cycles:</h2>
                    {isActive ? (
                        <div /* interval count */ className="mt-6 mx-6 font-bold text-6xl text-center">
                            {cycleCount - currentCycleCount}
                        </div>
                    ) : (
                        <input className="bg-transparent text-6xl text-center"
                        type="number"
                        value={cycleCount}
                        onChange={handleCycleCountChange}
                        min="1"
                        max="10"
                        placeholder="1"
                        />
                    )}
                </div>
            </div>
            <div /* buttons div */ className="flex justify-end mb-2 pr-6">
                <button className="px-8 py-2 m-2 bg-blue-600"onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
                <button className="px-8 py-2 m-2 bg-blue-600"onClick={resetTimer}>Reset</button>
                <button className="px-8 py-2 m-2 bg-red-600"onClick={clearAll}>Clear</button>
                <button className="px-8 py-2 m-2 bg-purple-700"onClick={saveTemplate}>Save</button>
            </div>
        </div>
        </>
    );
};