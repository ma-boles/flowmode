import React, { useEffect, useState } from "react";
import { searchAlbums, searchArtists, searchAudiobooks, searchPodcastEpisode, searchPodcastShow, searchTrack } from "@/app/lib/apiCall";
import { useSession } from "next-auth/react";
import "@/app/styles/styles.css"


export default function SearchComponent () {

    const { data: session } = useSession();
    const accessToken = session?.accessToken;
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

    return (
            <div className="bg-transparent">
                <div className="pb-12 flex justify-center">
                    <select className="p-2 px-4 bg-green-600 font-medium text-lg rounded-md cursor-pointer hover:bg-gray-700 transition duration-300 ease-in-out"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                        <option>Select</option>
                        <option value="artist">Artist</option>
                        <option value="album">Album</option>
                        <option value="track">Song</option>
                        <option value="audiobook">Book</option>
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
                <div className="mt-8 w-full ">

                {category === 'artist' &&
                    <div className="flex flex-wrap justify-center">
                        {searchResults.map((artist, index) => (
                            <ul key={index} className="artistCard">
                                <li className="text-center">
                                    <div className="mb-7">
                                        {artist.images[2] && (
                                            <img src={artist.images[2].url} alt={`Image of ${artist.name}`} className="artistImg"/>
                                          )}
                                            <h2 className="font-bold">{artist.name}</h2>
                                            <p>{artist.genres.join(', ')}</p>
                                    </div>
                                </li>
                            </ul>
                        ))}
                    </div>}

                    {category === 'album' &&
                        <div className="flex flex-wrap justify-center">
                            {searchResults.map ((album, index) => (
                                <ul key={index} className="artistCard">
                                    <div className="px-4">
                                        {album.images[2] && (
                                            <img src={album.images[0].url} alt={`Album cover of ${album.name}`} className="artistImg"></img>
                                    )}
                                            <h2 className="font-semibold text-center">{album.name}</h2>
                                            <h2 className="text-center">{album.artists[0].name}</h2>
                                    </div>
                                </ul>
                            ))}
                        </div>}

                    {category === 'track' &&
                        <div className="flex flex-wrap justify-center">
                            {searchResults.map ((track, index) => (
                                <ul key={index} className="artistCard">
                                    <div className="px-4">
                                        <img src={track.album.images[0].url} alt={`Album cover of ${track.album.name}`} className="trackImg" />
                                        <h2 className="text-center font-bold">{track.name}</h2>
                                        <h2 className="text-center">{track.artists[0].name}</h2>
                                    </div>
                                </ul>
                            ))}
                        </div>}

                        {category === 'audiobook' &&
                        <div className="flex flex-wrap justify-center">
                            {searchResults.map ((audiobook, index) => (
                                <ul key={index} className="artistCard">
                                    <div className="px-4">
                                        <img src={audiobook.images[0].url} alt={`Book cover of ${audiobook.name}`} className="trackImg" />
                                        <h2 className="text-center font-bold">{audiobook.name}</h2>
                                        <h2 className="text-center">{audiobook.authors[0].name}</h2>
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
                                        <h2 className="text-center font-bold">{show.name}</h2>
                                    </div>
                                </ul>
                            ))}
                        </div>}

                       {category === 'episode' &&
                        <div className="flex flex-wrap justify-center">
                            {searchResults.map ((episode, index) => (
                                <ul key={index} className="artistCard">
                                    <div className="cardWrapper ">
                                        <img src={episode.images[0].url} alt={`Image of ${episode.name}`} className="trackImg" />
                                        <h2 className="text-center font-medium">{episode.name}</h2>
                                    </div>
                                </ul>
                            ))}
                            </div>}

                </div>
            </div>
    )
};