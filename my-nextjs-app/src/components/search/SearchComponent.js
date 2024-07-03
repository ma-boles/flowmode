import React, { useEffect, useState } from "react";
import { searchAlbums, searchArtists, searchAudiobooks, searchPodcastEpisode, searchPodcastShow, searchTrack, searchPlaylist } from "@/app/lib/apiCall";
import { useSession } from "next-auth/react";
import "@/app/styles/styles.css";
import ItemCardButton from "../ItemCardButton";
import { PlaylistProvider, usePlaylistContext } from "@/app/contexts/PlaylistContext";
import { usePlayer } from "@/app/providers/PlayerProvider";


export default function SearchComponent ({ searchResults}) {
    const CategoryBlock = () => {
        const { handleSetFlowPlaylist, handleSetRestPlaylist, handleSetPreview } = usePlaylistContext();
        //const { onSelectFlow, onSelectPreview, onSelectRest } = usePlaylistContext();
        const onSelectFlow = (id, name) => {
            handleSetFlowPlaylist(id, name);
        };
        const onSelectRest = (id, name) => {
            handleSetRestPlaylist(id, name);
        };
        const onSelectPreview = (id, name) => {
            handleSetPreview(id, name);
        };

    const { data: session } = useSession();
    const accessToken = session?.accessToken;
    //const { playItem } = usePlayer();
    const [searchResults, setSearchResults] = useState([]);
    const [category, setCategory] = useState('');
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        setSearchResults([]);
    }, [category, keyword]);

    const handleKeyDown = async(event) => {
        if(event.key === 'Enter') {
            await executeSearch();
        }
    };


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

    const handleItemSelect = (selectedItem, itemType) => {
        console.log('Selected item:', selectedItem);

        if(playItem && selectedItem.uri) {
            playItem(selectedItem.uri);
        }

        // Handle different item types
        switch (itemType) {
            case 'track':
                break;
            case 'album':
                break;
            case 'playlist':
                break;
            case 'episode':
                break;
            case 'audiobook':
                break;
            case 'show':
                break;
            case 'artist':
                break;
            default:
                break;
        }
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
                                    <ItemCardButton playlist={album} onSelectFlow={onSelectFlow} onSelectRest={onSelectRest} onSelectPreview={onSelectPreview}/>
                                    <div className="px-4">
                                        {album.images[2] && (
                                            <img src={album.images[0].url} alt={`Album cover of ${album.name}`} className="artistImg"></img>
                                        )}
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
                                    <ItemCardButton playlist={track} onSelectFlow={onSelectFlow} onSelectRest={onSelectRest} onSelectPreview={onSelectPreview}/>
                                    <div className="px-4">
                                        <img src={track.album.images[0].url} alt={`Album cover of ${track.album.name}`} className="trackImg" />
                                        <div className="h-12">
                                            <h2 className="text-center font-bold hover:underline cursor-pointer" onClick={() => handleItemSelect(track)}>{track.name}</h2>
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
                                    <ItemCardButton playlist={audiobook} onSelectPreview={onSelectPreview} onSelectFlow={onSelectFlow} onSelectRest={onSelectRest}/>
                                    <div className="px-4">
                                        <img src={audiobook.images[0].url} alt={`Book cover of ${audiobook.name}`} className="trackImg" />
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
                                    <ItemCardButton playlist={playlist} onSelectFlow={onSelectFlow} onSelectRest={onSelectRest} onSelectPreview={onSelectPreview}/>
                                    <div className="cardWrapper ">
                                        <img src={playlist.images[0].url} alt={`Image of ${playlist.name}`} className="trackImg" />
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
                                    <ItemCardButton playlist={episode} onSelectFlow={onSelectFlow} onSelectRest={onSelectRest} onSelectPreview={onSelectFlow}/>
                                    <div className="cardWrapper ">
                                        <img src={episode.images[0].url} alt={`Image of ${episode.name}`} className="trackImg" />
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

    return (
        <PlaylistProvider>
            <CategoryBlock searchResults={searchResults}/>
        </PlaylistProvider>
    )
};