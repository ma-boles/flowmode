import React, { useState } from "react";
import { searchAlbums, searchArtists, searchAudiobooks, searchPodcastEpisode, searchPodcastShow, searchTrack } from "@/app/lib/apiCall";
import { useSession } from "next-auth/react";
import "@/app/styles/styles.css"


export default function SearchComponent () {

    const { data: session } = useSession();
    const accessToken = session?.accessToken;
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
            <div className="bg-transparent ">
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

               <div className="bg-white rounded-md">
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

                <div className="mx-2 bg-blue-500 ">
                    <h1 className="mt-0 pt-0 text-slate-900 font-semibold">Results</h1>
                        {searchResults.map((artist, index) => (
                            <ul key={index}>
                                <li>{artist.name}</li>
                                <li>{artist.genre}</li>
                            </ul>
                        ))}
                </div>
            </div>
            
            
            
    )
}

                