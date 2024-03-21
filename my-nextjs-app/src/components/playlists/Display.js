import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import "@/app/styles/styles.css"
import { getPlaylists } from "@/app/lib/apiCall";
import { getUserOwnedPlaylists } from "@/app/lib/apiCall";


export default function Display() {

    const { data: session } = useSession();
    const accessToken = session?.accessToken;
    const [playlists, setPlaylists] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [remainingPlaylists, setRemainingPlaylists] = useState([]);
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
                const userOwnedPlaylists = playlistsData.filter(playlist => {
                    return playlist.owner.id === session.user.sub;
                });

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
    }, [accessToken, currentPage, session]); // Re-run on every accessToken or session change

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };
    const handlePreviousPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };



    return (
        <>
        <div className="flex justify-between">
        <h1 className="mx-0 my-2 p-0">My Playlists</h1>
            <div>
                <button className="m-1 px-3 py-1  bg-gray-900 rounded-md">Grid</button>
                <button className="m-1 px-3 py-1  bg-gray-700 rounded-md">List</button>
            </div>
        </div>
        {/*<ul >
            {playlists.map(playlist =>(
                <li key={playlist.id} className="flex my-1 mx-0 p-4 bg-gray-700 rounded-md">
                    <h2>{playlist.name} </h2>
                    <p className="mx-4 font-thin">{playlist.description}</p>
                </li>
            ))}
        </ul>*/}
        <ul className="flex flex-wrap justify-center">
            {playlists.map(playlist =>(
                <li key={playlist.id} className=" bg-gray-700 playlistCard">
                    <img src={playlist.images[0].url} alt={`Cover of ${playlist.name}`} className="playlistImg" />
                    <h2 className="text-center">{playlist.name} </h2>
                    <p className="mx-4 font-thin text-center">{playlist.description}</p>
                </li>
            ))}
        </ul>
        <div className="flex justify-between">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>Last</button>
            <button onClick={handleNextPage} disabled={remainingPlaylists.length === 0}>Next</button>
        </div>
        </>
    );
}