import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import "@/app/styles/styles.css"
import { getPlaylists } from "@/app/lib/apiCall";
import { getUserOwnedPlaylists } from "@/app/lib/apiCall";


export default function Display({ viewMode, isDisplayOpen, setIsDisplayOpen }) {

    const { data: session } = useSession();
    const accessToken = session?.accessToken;
    const [playlists, setPlaylists] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [remainingPlaylists, setRemainingPlaylists] = useState([]);
    const [displayStyle, setDisplayStyle] = useState('grid');
    const pageSize = 10;


    useEffect(() => {
        async function fetchPlaylists() {
            try {
                if(!accessToken) {
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

                // Calculate the current page's playlists and remaining playlists
                const startIndex = (currentPage - 1) * pageSize;
                const endIndex = startIndex + pageSize;
                const currentPlaylists = userOwnedPlaylists.slice(startIndex, endIndex);
                const remaining = userOwnedPlaylists.slice(endIndex);

                setPlaylists(currentPlaylists);
                setRemainingPlaylists(remaining);
            } catch(error) {
                console.error('Error fetching playlists:', error);
            }
        }
        fetchPlaylists();
    }, [accessToken, currentPage, session, viewMode]); // Re-run on every accessToken or session change

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


    return (
        <>
        <div className="text-right">
            <button className="px-2 border border-solid border-white cursor-pointer" onClick={handleClose}>x</button>
        </div>

        <div className="px-20 flex justify-between">
            <h1 className="mx-0 my-2 p-0">
                {viewMode === 'userOwnedPlaylists'? 'My Playlists': 'All Playlists'}
            </h1>
            <div>
                <button className={`m-1 px-3 py-1 ${displayStyle === 'grid' ? 'bg-blue-500' : 'bg-gray-900'} rounded-md`} onClick={() => handleToggleStyle('grid')}>Grid</button>
                <button className={`m-1 px-3 py-1 ${displayStyle === 'list' ? 'bg-blue-500' : 'bg-gray-900'} rounded-md`} onClick={() => handleToggleStyle('list')}>List</button>
            </div>
        </div>

        <ul /*className="flex flex-wrap justify-center"*/ className={`flex ${displayStyle === 'grid' ? 'flex-wrap justify-center' : 'playlistList'}`}>
            {playlists.map(playlist =>(
                <li key={playlist.id} /*className=" bg-gray-700 playlistCard"*/className={`bg-gray-700 ${displayStyle === 'grid' ? 'playlistCard' : 'playlistCardList'}`}>
                    <div className={`${displayStyle === 'list' ? 'w-1/4' : 'div'}`}>
                    <img src={playlist.images[0].url} alt={`Cover of ${playlist.name}`} className={`${displayStyle === 'grid' ? 'playlistImg' : 'playlistImgList' }`} />
                    </div>
                    <div className={`${displayStyle === 'list' ? 'm-auto w-1/4': 'div'}`}>
                    <h2 /*className="text-center"*/ className={` ${displayStyle === 'list' ? 'text-xl text-left' : 'text-center'}`}>{playlist.name} </h2>
                    </div>
                    <div className={`${displayStyle === 'list' ? 'm-auto w-2/4' : 'div'}`}>
                    <p className={`mx-4 ${displayStyle === 'list' ? 'font-thin text-lg text-left' : 'font-thin text-center'}`}>{playlist.description}</p>
                    </div>
                </li>
            ))}
        </ul>
        <div className="flex justify-between">
            <button className="m-1 px-3 py-1 bg-gray-900 rounded-md" onClick={handlePreviousPage} disabled={currentPage === 1}>Last</button>
            <button className="m-1 px-3 py-1 bg-gray-900 rounded-md" onClick={handleNextPage} disabled={remainingPlaylists.length === 0}>Next</button>
        </div>
        </>
    );
}