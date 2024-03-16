import axios from "axios";

const searchArtists = async (query, accessToken) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
            params: {
                type: 'artist',
                q: query,
            },
            headers:{
                Authorization: `Bearer ${accessToken}`,
            },
        });

        console.log('Artist search response:', response.data);
        return response.data.artists.items;

    } catch (error) {
        console.log('Error searching artist:', error);
        throw error;
    }
};

const searchAlbums = async (query, accessToken) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
            params: {
                type: 'album',
                q: query,
            },
            headers:{
                Authorization: `Bearer ${accessToken}`,
            },
        });

        console.log('Album search response:', response.data);
        return response.data.albums.items;

    } catch(error) {
        console.log('Error searching album:', error);
        throw error;
    }
};

const searchTrack = async (query, accessToken) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
        params: {
            type: 'track',
            q: query,
        },
        headers:{
            Authorization: `Bearer ${accessToken}`,
        },
    })

    console.log('Track search response:', response.data);
    return response.data.tracks.items;

    } catch (error) {
        console.log('Error searching track:', error);
        throw error;
    }
};

const searchAudiobooks = async (query, accessToken) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
            params: {
                type: 'audiobook',
                q: query,
            },
            headers:{
                Authorization: `Bearer ${accessToken}`,
            },
        });

        console.log('Audiobook search response:', response.data);
        return response.data.audiobooks.items;

    } catch (error) {
        console.log('Error searching audiobook:', error);
        throw error;
    }
};

const searchPodcastShow = async (query, accessToken) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
            params: {
                type: 'show',
                q: query,
            },
            headers:{
                Authorization: `Bearer ${accessToken}`,
            },
        });

        console.log('Show search response:', response.data);
        return response.data.shows.items;

    } catch (error) {
        console.log('Error searching show:', error);
        throw error;
    }
};

const searchPodcastEpisode = async (query, accessToken) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
            params: {
                type: 'episode',
                q: query,
            },
            headers:{
                Authorization: `Bearer ${accessToken}`,
            },
        });

        console.log('Show search response:', response.data);
        return response.data.episodes.items;

    } catch (error) {
        console.log('Error searching episode:', error);
        throw error;
    }
};

const searchPlaylist = async (query, accessToken) => {
        try {
            const response = await axios.get('https://api.spotify.com/v1/search', {
                params: {
                    type: 'playlist',
                    q: query,
                },
                headers:{
                    Authorization: `Bearer ${accessToken}`,
                },
            });
    
            console.log('Playlist search response:', response.data);
            return response.data.playlists.items;
    
        } catch (error) {
            console.log('Error searching playlist:', error);
            throw error;
        }

};


export { searchArtists, searchTrack, searchAlbums, searchAudiobooks, searchPodcastShow, searchPodcastEpisode, searchPlaylist  };