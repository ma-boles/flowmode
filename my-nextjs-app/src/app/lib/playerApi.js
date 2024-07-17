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
        const { paused } = playerState || {};

        if(paused === undefined) {
            console.error('playerState does not have the paused property');
            return;
        }
        if(paused) {
            await fetch('https://api.spotify.com/v1/me/player/pause', {
                method:'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        } else {
            // if currently paused, resume the playback
            await fetch('https://api.spotify.com/v1/me/player/play', {
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

const playMedia = async (type, id, accessToken) => {
    let url = `https://api.spotify.com/v1/me/player/play`;
    let body;

    switch(type) {
        case 'track':
            body = JSON.stringify({ uris: [`spotify:track:${id}`] });
            break;
        case 'album':
            body = JSON.stringify({ context_uri: `spotify:album:${id}`});
            break;
        case 'playlist':
            body = JSON.stringify({ context_uri: `spotify:playlist:${id}` });
            break;
        case 'podcast':
            body = JSON.stringify({ context_uri: `spotify:episode:${id}` });
            break;
        case 'audiobook':
            body = JSON.stringify({ context_uri: `spotify:audiobook:${id}` });
            break;
        default:
            console.error('Unsupported media type');
            return;
    }

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: body,
        });

        if(response.ok) {
            console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} is playing`);
        } else {
            const errorData = await response.json();
            console.error('Failes to play media:', response.status, response,statesText, errorData);
        }
    } catch (error) {
        console.error('Error playing media:', error);
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

export { playTracks, stopPlayback, playSong, pausePlayback, resumePlayback, skipTrack, previousTrack, togglePlay, playMedia }