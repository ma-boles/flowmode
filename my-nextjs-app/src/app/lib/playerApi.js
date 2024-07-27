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

// controls for player
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

const toggleShuffle = async (accessToken, shouldShuffle) => {
    try {
        await fetch(`https://api.spotify.com/v1/me/player/shuffle`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        console.log(`Shuffle is now ${shouldShuffle ? 'enabled' : 'disabled'}`);
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
    await fetch(`https://api.spotify.com/v1/me/player/play`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            context_uri: playlistUri,
        }),
    });
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