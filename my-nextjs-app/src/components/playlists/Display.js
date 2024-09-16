import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import "@/app/styles/styles.css"
import { getPlaylists } from "@/app/lib/apiCall";
import PlaylistItem from "../PlaylistItem";
import { usePlaylistContext } from "@/app/contexts/PlaylistContext";
import { getUserOwnedPlaylists } from "@/app/lib/apiCall";


export default function Display({ viewMode, isDisplayOpen, setIsDisplayOpen,/* cleanDescription,*/  }) {
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
    //const { onSelectFlow, onSelectRest, onSelectPreview } = usePlaylistContext();

    const [playlists, setPlaylists] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [remainingPlaylists, setRemainingPlaylists] = useState([]);
    const [displayStyle, setDisplayStyle] = useState('grid');
    const [loading, setLoading] = useState(true);
    const [displayedPlaylists, setDisplayedPlaylists] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPlaylists, setFilteredPlaylists] = useState([]);
    //const [hoveredDescription, setHoveredDescription] = useState(null);
    const pageSize = 50;

    const cleanDescription = (description) => {
        // Create a new div element
        const divDescription = document.createElement('div');
        // Set the HTML content with the provided description
        divDescription.innerHTML = description;
        // Retrieve the tect content which will decode the HTML entittie
        return divDescription.textContent || divDescription.innerText || "";
    };


    useEffect(() => {
        async function fetchPlaylists() {
            try {
                if(!accessToken) {
                    setLoading(false);
                    return; // Exit if access token is not available
                }

                const offset= (currentPage - 1) * pageSize;
                const playlistsData = await getPlaylists(accessToken, offset, pageSize);

                console.log('All Playlists:', playlistsData);

                // Filter playlists to include only ones owned by user
                const userOwnedPlaylists = viewMode === 'userOwnedPlaylists'
                    ? playlistsData.filter(playlist => playlist.owner.id === session.user.id)
                    : playlistsData

                console.log('User Owned Playlists:', userOwnedPlaylists);

                // Set displayed playlists based on view mode
                const sourcePlaylists = viewMode === 'userOwnedPlaylists' ? userOwnedPlaylists : playlistsData;
                setDisplayedPlaylists(sourcePlaylists);

                // Initialize filtered playlists with current playlists
                setFilteredPlaylists(sourcePlaylists);

                // Calculate the current page's playlists and remaining playlists
                const startIndex = (currentPage - 1) * pageSize;
                const endIndex = startIndex + pageSize;
                const currentPlaylists = userOwnedPlaylists.slice(startIndex, endIndex);
                const remaining = userOwnedPlaylists.slice(endIndex);

                setPlaylists(currentPlaylists);
                setRemainingPlaylists(remaining);
                setLoading(false);
            } catch(error) {
                console.error('Error fetching playlists:', error);
            }
        }
        fetchPlaylists();
    }, [accessToken, currentPage, session, viewMode]); // Re-run on every accessToken or session change

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredPlaylists(displayedPlaylists);
        } else {
            const lowercaseQuery = searchQuery.toLowerCase();
            const filtered = displayedPlaylists.filter(playlist =>
                playlist.name.toLowerCase().includes(lowercaseQuery)
            );
            setFilteredPlaylists(filtered);
        }
        console.log('Search Query:', searchQuery)
        console.log('Results:', filteredPlaylists)

    }, [searchQuery, displayedPlaylists]);

    if(loading) {
        return <div>Loading...</div>;
    }

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };
    const handlePreviousPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const handleToggleStyle = (style) => {
        setDisplayStyle(style);
    };

    const handleClose = () => {
        if(isDisplayOpen === true) {
            setIsDisplayOpen(false);
        }
    };

    /*const handleDescriptionHover = (description) => {
        setHoveredDescription(description);
    };

    const handleDescriptionLeave = () => {
        setHoveredDescription(null);
    };*/


    return (
        <>
        <div className="text-right">
            <button className="px-2 border border-solid border-white cursor-pointer" onClick={handleClose}>x</button>
        </div>

        <div className="px-20 flex justify-between">

            <div className="flex justify-around w-1/3 my-6 mx-2 border border-solid border-gray-700 rounded-md displaySearchInput">
                        <input className="outline-none p-2 m-2 text-xl displaySearchInput" /*text-slate-800 */
                        type="text"
                        placeholder="Title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="py-0 px-7 m-2 bg-green-600 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out"
                        /*onClick={executeSearch} */>Search</button>
                </div>
            <div>
                <button className={`m-1 px-3 py-1 ${displayStyle === 'grid' ? 'bg-blue-500' : 'bg-gray-900'} rounded-md`} onClick={() => handleToggleStyle('grid')}>Grid</button>
                <button className={`m-1 px-3 py-1 ${displayStyle === 'list' ? 'bg-blue-500' : 'bg-gray-900'} rounded-md`} onClick={() => handleToggleStyle('list')}>List</button>
            </div>
        </div>

        <ul className={`flex ${displayStyle === 'grid' ? 'flex-wrap justify-center' : 'playlistList'}`}>
            {filteredPlaylists.map(playlist =>(
                <PlaylistItem
                key={playlist.id}
                playlist={playlist}
                displayStyle={displayStyle}
                cleanDescription={cleanDescription}
                onSelectFlow={onSelectFlow}
                onSelectRest={onSelectRest}
                onSelectPreview={onSelectPreview}
                />
                ))}
        </ul>

        <div className="flex justify-between">
            <button className={`m-1 px-3 py-1 bg-gray-900 rounded-md ${currentPage === 1 ? 'opacity-0' : 'bg-gray-900'}`} onClick={handlePreviousPage} disabled={currentPage === 1}>Last</button>
            <button className={`m-1 px-3 py-1 bg-gray-900 rounded-md ${remainingPlaylists.length === 0 ? 'opacity-0' : 'bg-gray-900'}`} onClick={handleNextPage} disabled={remainingPlaylists.length === 0}>Next</button>
        </div>
        </>
    );
}