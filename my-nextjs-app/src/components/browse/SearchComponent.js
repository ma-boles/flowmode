import React, { useState } from "react";
import { searchAlbums, searchArtists, searchAudiobooks, searchPodcastEpisode, searchPodcastShow, searchTrack } from "@/app/lib/apiCall";
import { useSession } from "next-auth/react";
import "@/app/styles/styles.css"


export default function SearchComponent () {

    const { data: session } = useSession();
    const accessToken = session?.accessToken;
    const [searchResults, setSearchResults] = useState([]);
    const [category, setCategory] = useState('');
    const [keyword, setKeyword] = useState('');
    

    const handleSearch = async () => {
        console.log('Search initiated with category:', category, 'and keyword:', keyword );

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
    };

    return (
            <div className="bg-transparent">
                <div className="pb-12 flex justify-center">
                    <select className="p-2 px-4 bg-green-600 font-medium text-lg rounded-md"
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
                        />
                        <button className="p-3 mr-4 pl-10 pr-10 bg-green-600 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out"
                        onClick={handleSearch}
                        >Search</button>
                    </div>
                </div>
                <div className="mt-8 w-full ">

                {category === 'artist' &&
                    <div className="flex flex-wrap justify-center">
                        {searchResults.map((artist, index) => (
                            <ul key={index} className="justify-center m-1 bg-red-500 flex flex-col items-center rounded-md artistCard">
                                <li className="text-center">
                                {artist.images[2] && (
                                    <img src={artist.images[2].url} alt={`Image of ${artist.name}`} className="artistImg"/>
                                    )}
                                    <h2 className="font-bold">{artist.name}</h2>
                                    <p>{artist.genres.join(', ')}</p>
                                </li>
                            </ul>
                        ))}
                    </div>}

                    {category === 'album' && 
                        <div className="flex flex-wrap justify-center">
                            {searchResults.map ((album, index) => (
                                <ul key={index} className="justify-center m-1 bg-red-500 flex flex-col items-center rounded-md artistCard">
                                    {album.images[2] && (
                                        <img src={album.images[2].url} alt={`Image of ${album.name}`} className="artistImg"></img>
                                    )}
                                    <h2 className="font-semibold text-center">{album.name}</h2>
                                    <h2>{album.artists[0].name}</h2>
                                </ul>
                            ))}
                        </div>}
                    
                    {category === 'track' && 
                        <div className="flex flex-wrap justify-center">
                            {searchResults.map ((track, index) => (
                                <ul key={index} className="justify-center m-1 flex flex-col items-center rounded-md artistCard">
                                    <img src={track.album.images[2].url} alt={`Album cover of ${track.album.name}`} className="trackImg" />

                                    <h2 className="text-center font-bold">{track.name}</h2>
                                    <h2 className="text-center">{track.artists[0].name}</h2>
                                </ul>
                            ))}
                        </div>
                    }
                </div>
            </div>
    )
}