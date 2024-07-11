import axios from "axios";
import { useEffect, useState, useSession } from "react";

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

export { playTracks, stopPlayback, playSong, pausePlayback, resumePlayback, skipTrack, previousTrack }