import React, { useEffect, useState } from "react";
import { searchAlbums, searchArtists, searchAudiobooks, searchPodcastEpisode, searchPodcastShow, searchTrack, searchPlaylist } from "@/app/lib/apiCall";
import { useSession } from "next-auth/react";
import "@/app/styles/styles.css";
import ItemCardButton from "../ItemCardButton";
import { usePlaylistContext } from "@/app/contexts/PlaylistContext";
import usePlayer from "@/app/hooks/usePlayer";
import { playSong, playAlbum, playAudiobook, playEpisode, playPlaylist } from "@/app/lib/playerApi";
import { PlayerProvider } from "@/app/providers/PlayerProvider";


export default function SearchComponent ({ playlist/*, previewId*/ }) {

    const { handleSetFlowPlaylist, handleSetRestPlaylist, handleSetPreview } = usePlaylistContext();
    const { data: session } = useSession();
    const accessToken = session?.accessToken;

    const [searchResults, setSearchResults] = useState([]);
    const [category, setCategory] = useState('');
    const [keyword, setKeyword] = useState('');
    const [addedType, setAddedType] = useState(null);



    useEffect(() => {
        setSearchResults([]);
    }, [category, keyword]);

    const handleKeyDown = async(event) => {
        if(event.key === 'Enter') {
            await executeSearch();
        }
    };

    // Search functions
    const executeSearch = async () => {
        console.log('Search initiated with category:', category, 'and keyword:', keyword );

        if(category && keyword) {
            try {
                let results = [];

                switch (category) {
                    case 'artist':
                        console.log('Searching for artists...');
                        results = await searchArtists(keyword, accessToken);
                        break;
                    case 'album':
                        console.log('Searching for albums...');
                        results = await searchAlbums(keyword, accessToken);
                        break;
                    case 'track':
                        console.log('Searching for tracks...');
                        results = await searchTrack(keyword, accessToken);
                        break;
                    case 'audiobook':
                        console.log('Searching for audiobooks...');
                        results = await searchAudiobooks(keyword, accessToken);
                        break;
                    case 'show':
                        console.log('Searching for shows...');
                        results = await searchPodcastShow(keyword, accessToken);
                        break;
                    case 'episode':
                        console.log('Searching for episodes...');
                        results = await searchPodcastEpisode(keyword, accessToken);
                        break;
                    case 'playlist':
                        console.log('Searching for playlists...');
                        results = await searchPlaylist(keyword, accessToken);
                        break;
                    default:
                        break;
                }
                console.log('Search results:', results);

                setSearchResults(results);

            } catch (error) {
                console.error('Error occurred during search:', error);
        }
    }
};

    // Play function for previewing items
    const handleItemSelect = (selectedItem, itemType) => {
        switch (itemType) {
            case 'track':
                playSong(selectedItem.uri, accessToken);
                console.log('Selected track:', selectedItem.name);
                break;
            case 'album':
                playAlbum(selectedItem.uri, accessToken);
                console.log('Selected album:', selectedItem.name);
                break;
            case 'playlist':
                playPlaylist(selectedItem.uri, accessToken);
                console.log('Selected playlist:', selectedItem.name);
                break;
            case 'episode':
                playEpisode(selectedItem.uri, accessToken);
                console.log('Selected episode:', selectedItem.name);
                break;
            case 'audiobook':
                playAudiobook(selectedItem.uri, accessToken);
                console.log('Selected audiobook:', selectedItem.name);
                break;
            case 'show':
                break;
            case 'artist':
                break;
            default:
                console.warn('Unknown item type:', itemType);
                break;
        }
    };

    // Selecting items for flow and rest
    const onSelectFlow = (id, name) => {
        handleSetFlowPlaylist(id, name);
        console.log('Select flow:', id, name);
    };

    const onSelectRest = (id, name) => {
        handleSetRestPlaylist(id, name);
        console.log('Select rest:', id, name);
    };


    return (
            <div className="bg-transparent">
                <div /* search section */ className="pb-12 flex justify-center">
                    <select className="p-2 px-4 bg-green-600 font-medium text-lg rounded-md cursor-pointer hover:bg-gray-700 transition duration-300 ease-in-out"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                        <option>Select</option>
                        <option value="artist">Artist</option>
                        <option value="album">Album</option>
                        <option value="track">Song</option>
                        <option value="audiobook">Book</option>
                        <option value="playlist">Playlist</option>
                        <option value="show">Podcast Show</option>
                        <option value="episode">Podcast Episode</option>
                    </select>
                </div>

                <div className="flex justify-center">
                    <div className="bg-white rounded-md input">
                        <input className="outline-none p-2 m-4 text-xl text-slate-800"
                        type="text"
                        placeholder="Title, Artist, Name..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        />
                        <button className="p-3 mr-4 pl-10 pr-10 bg-green-600 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out"
                        onClick={executeSearch}
                        >Search</button>
                    </div>
                </div>
                <div /*results*/ className="my-8 w-full ">

                {category === 'artist' &&
                    <div className="flex flex-wrap justify-center">
                        {searchResults.map((artist, index) => (
                            <ul key={index} className="artistCard">
                                <li className="text-center">
                                    <div className="mb-7">
                                        {artist.images[2] && (
                                            <img src={artist.images[2].url} alt={`Image of ${artist.name}`} className="artistImg"/>
                                          )}
                                            <div className="h-12">
                                                <h2 className="font-bold">{artist.name}</h2>
                                                <p>{artist.genres.join(', ')}</p>
                                            </div>
                                    </div>
                                </li>
                            </ul>
                        ))}
                    </div>}

                    {category === 'album' &&
                        <div className="flex flex-wrap justify-center">
                            {searchResults.map ((album, index) => (
                                <ul key={index} className="artistCard">
                                    <ItemCardButton playlist={album} onSelectFlow={onSelectFlow} onSelectRest={onSelectRest} accessToken={accessToken}/>
                                    <div className="px-4">
                                        <button onClick={() => handleItemSelect(album, 'album')} className="playImgButton">
                                            {album.images[2] && (
                                                <img src={album.images[0].url} alt={`Album cover of ${album.name}`} className="artistImg"></img>
                                            )}
                                            <div className="overlay">
                                                <span className="playIcon"></span>
                                            </div>
                                        </button>
                                            <div className="h-12">
                                                <h2 className="font-semibold text-center">{album.name}</h2>
                                                <h2 className="text-center">{album.artists[0].name}</h2>
                                            </div>
                                    </div>
                                </ul>
                            ))}
                        </div>}

                    {category === 'track' &&
                        <div className="flex flex-wrap justify-center">
                            {searchResults.map ((track, index) => (
                                <ul key={index} className="artistCard">
                                    <ItemCardButton playlist={track} onSelectFlow={onSelectFlow} onSelectRest={onSelectRest} accessToken={accessToken}/>
                                    <div className="px-4">
                                        <button onClick={() => handleItemSelect(track, 'track')} className="playImgButton">
                                            <img src={track.album.images[0].url} alt={`Album cover of ${track.album.name}`} className="trackImg" />
                                            <div className="overlay">
                                                <span className="playIcon"></span>
                                            </div>
                                        </button>
                                        <div className="h-12">
                                            <h2 className="text-center font-bold hover:underline cursor-pointer">{track.name}</h2>
                                            <h2 className="text-center">{track.artists[0].name}</h2>
                                        </div>
                                    </div>
                                </ul>
                            ))}
                        </div>}

                        {category === 'audiobook' &&
                        <div className="flex flex-wrap justify-center">
                            {searchResults.map ((audiobook, index) => (
                                <ul key={index} className="artistCard">
                                    <ItemCardButton playlist={audiobook} onSelectFlow={onSelectFlow} onSelectRest={onSelectRest} accessToken={accessToken}/>
                                    <div className="px-4">
                                        <button onClick={() => handleItemSelect(audiobook, 'audiobook')} className="playImgButton">
                                            <img src={audiobook.images[0].url} alt={`Book cover of ${audiobook.name}`} className="trackImg" />
                                            <div className="overlay">
                                                <span className="playIcon"></span>
                                            </div>
                                        </button>
                                        <div className="h-12">
                                            <h2 className="text-center font-bold">{audiobook.name}</h2>
                                            <h2 className="text-center">{audiobook.authors[0].name}</h2>
                                        </div>
                                    </div>
                                </ul>
                            ))}
                        </div>}

                        {category === 'playlist' &&
                        <div className="flex flex-wrap justify-center">
                            {searchResults.map ((playlist, index) => (
                                <ul key={index} className="artistCard">
                                    <ItemCardButton playlist={playlist} onSelectFlow={onSelectFlow} onSelectRest={onSelectRest} accessToken={accessToken}/>
                                    <div className="px-4">
                                        <button onClick={() => handleItemSelect(playlist, 'playlist')} className="playImgButton">
                                            <img src={playlist.images[0].url} alt={`Image of ${playlist.name}`} className="trackImg" />
                                            <div className="overlay">
                                                <span className="playIcon"></span>
                                            </div>
                                        </button>
                                        <div className="h-12">
                                            <h2 className="text-center font-medium">{playlist.name}</h2>
                                        </div>
                                    </div>
                                </ul>
                            ))}
                            </div>}

                        {category === 'show' &&
                        <div className="flex flex-wrap justify-center">
                            {searchResults.map ((show, index) => (
                                <ul key={index} className="artistCard">
                                    <div className="px-4">
                                        <img src={show.images[0].url} alt={`Image of ${show.name}`} className="trackImg" />
                                        <div className="h-12">
                                            <h2 className="text-center font-bold">{show.name}</h2>
                                        </div>
                                    </div>
                                </ul>
                            ))}
                        </div>}

                       {category === 'episode' &&
                        <div className="flex flex-wrap justify-center">
                            {searchResults.map ((episode, index) => (
                                <ul key={index} className="artistCard">
                                    <ItemCardButton playlist={episode} onSelectFlow={onSelectFlow} onSelectRest={onSelectRest} accessToken={accessToken}/>
                                    <div className="px-4">
                                        <button onClick={() => handleItemSelect(episode, 'episode')} className="playImgButton">
                                            <img src={episode.images[0].url} alt={`Image of ${episode.name}`} className="trackImg" />
                                            <div className="overlay">
                                                <span className="playIcon"></span>
                                            </div>
                                        </button>
                                        <div className="h-12">
                                            <h2 className="text-center font-medium">{episode.name}</h2>
                                        </div>
                                    </div>
                                </ul>
                            ))}
                        </div>}
                </div>
            </div>
        )
};

/*if(itemType === 'track' && playSong && selectedItem.uri) {
            try {
                await playSong(selectedItem.uri, accessToken)
            } catch(error) {
                console.error('Error playing song:', error)
            }
        } else {*/

    /*const handlePreviewClick = async() => {
        if (!playlist) {
            console.error('No playlist provided.');
            return;
        }

        if(playlist.id === previewId) {
            setAddedType(null);
        } else {
            onSelectPreview(playlist.id, playlist.name);
            setAddedType('preview');
        }
        await playSong(playlist.uri, accessToken);
    };*/

        //const isPreviewAdded = playlist.id === previewId;


    /*const onSelectPreview = (id, name) => {
        handleSetPreview(id, name);
        console.log('On select preview:', id, name);
    };*/