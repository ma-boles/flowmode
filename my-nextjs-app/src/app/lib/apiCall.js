import axios from "axios";

const searchArtists = async (query, accessToken) => {
    const response = await axios.get('https://api.spotify/com/v1/search', {
        params: {
            type: 'artist',
            q: query,
        },
        headers:{
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data.artist.items;
};

const searchAlbums = async (query, accessToken) => {
    const response = await axios.get('https://api.spotify/com/v1/search', {
        params: {
            type: 'album',
            q: query,
        },
        headers:{
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data.albums.items;
};

const searchTrack = async (query, accessToken) => {
    const response = await axios.get('https://api.spotify/com/v1/search', {
        params: {
            type: 'track',
            q: query,
        },
        headers:{
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data.tracks.items;
};

const searchAudiobooks = async (query, accessToken) => {
    const response = await axios.get('https://api.spotify/com/v1/search', {
        params: {
            type: 'audiobook',
            q: query,
        },
        headers:{
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data.audiobooks.items;
};

const searchPodcastShow = async (query, accessToken) => {
    const response = await axios.get('https://api.spotify/com/v1/search', {
        params: {
            type: 'show',
            q: query,
        },
        headers:{
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data.shows.items;
};

const searchPodcastEpisode = async (query, accessToken) => {
    const response = await axios.get('https://api.spotify/com/v1/search', {
        params: {
            type: 'episode',
            q: query,
        },
        headers:{
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data.episodes.items;
};

export { searchArtists, searchTrack, searchAlbums, searchAudiobooks, searchPodcastShow, searchPodcastEpisode  };