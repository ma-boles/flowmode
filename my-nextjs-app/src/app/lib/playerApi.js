import axios from "axios";
import { useEffect, useState, useSession, useContext } from "react";
import { PlayerContext } from "../providers/PlayerProvider";


// controls for flow, rest, preview
const playTracks = (tracks, accessToken) => {
    fetch(`https://api.spotify.com/v1/me/player/play`, {
        method: 'PUT',
        body: JSON.stringify({ uris: tracks }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    }).catch(error => console.error('Error playing tracks:', error));
};

const stopPlayback = (accessToken) => {
    fetch(`https://api.spotify.com/v1/me/player/pause`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    }).catch(error => console.error('Error stopping playback:', error));
};


// Controls for player
const togglePlay = async (accessToken, playerState) => {
    try {
        if(!playerState) {
            console.error('Player state is undefined.');
            return;
        }

        const { paused } = playerState;

        if(typeof paused === 'undefined') {
            console.error('playerState does not have the paused property');
            return;
        }
        if(paused) {
            await fetch('https://api.spotify.com/v1/me/player/resume', {
                method:'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        } else {
            await fetch('https://api.spotify.com/v1/me/player/pause', {
                method: 'PUT',
                headers : {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        }
    } catch (error) {
        console.error('Error toggling play:', error);
    }
};

const pausePlayback = async(accessToken) => {
    await fetch(`https://api.spotify.com/v1/me/player/pause`, {
        method: 'PUT',
        headers: {
            'Athorization': `Bearer ${accessToken}`,
        },
    });
};

const resumePlayback = async (accessToken) => {
    await fetch(`https://api.spotify.com/v1/me/player/play`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });
};

const skipTrack = async (accessToken) => {
    await fetch(`https://api.spotify.com/v1/me/player/next`, {
        method: 'POST',
        headers:{
            'Authorization': `Bearer ${accessToken}`,
        },
    });
};

const previousTrack = async (accessToken) => {
    await fetch(`https://api.spotify.com/v1/me/player/previous`, {
        method: 'POST',
        headers:{
            'Authorization': `Bearer ${accessToken}`,
        },
    });
};

const toggleShuffle = async (accessToken, playerState) => {
    try {
        if(!playerState) {
            console.error('Player state is undefined.');
            return;
        }

        // Fetch the current shuffle state
        const response = await fetch('https://api.spotify.com/v1/me/player', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        const data = await response.json();
        const currentShuffleState = data.shuffle_state;

        if(typeof currentShuffleState === 'undefined') {
            console.error('playerState does not have the shuffle_state property');
            return;
        }

        // Toggle shuffle state
        const newShuffleState = !currentShuffleState;

        await fetch(`https://api.spotify.com/v1/me/player/shuffle`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ state: newShuffleState })
        });
        console.log(`Shuffle mode ${newShuffleState ? 'enabled': 'disabled'}`);
        } catch (error) {
        console.error('Error toggling shuffle:', error);
    }
};


// Triggering playback in preview mode
const playSong = async (uri, accessToken) => {
    await fetch(`https://api.spotify.com/v1/me/player/play`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            uris: [uri],
        }),
    });
};

const playAlbum = async (albumUri, accessToken) => {
    await fetch(`https://api.spotify.com/v1/me/player/play`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            context_uri: albumUri,
        }),
    });
};

const playPlaylist = async (playlistUri, accessToken) => {
    try {
        const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                context_uri: playlistUri,
            }),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        console.log('Playback started successfully for playlist:', playlistUri)
    } catch(error) {
        console.error('Error in playPlaylist:', error);
    }
};

const playAudiobook = async (audiobookUri, accessToken) => {
    await fetch(`https://api.spotify.com/v1/me/player/play`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            context_uri: audiobookUri,
        }),
    });
};

const playEpisode = async (episodeUri, accessToken) => {
    await fetch(`https://api.spotify.com/v1/me/player/play`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            uris: [episodeUri],
        }),
    });
};

export { playTracks, stopPlayback, playSong, playAudiobook, playAlbum, playEpisode, playPlaylist, pausePlayback, resumePlayback, skipTrack, previousTrack, togglePlay, toggleShuffle }