import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import "@/app/styles/styles.css"
import { getPlaylists } from "@/app/lib/apiCall";

export default function Display() {

    const { data: session } = useSession();
    const accessToken = session?.accessToken;
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        async function fetchPlaylists() {
            try {
                if(!accessToken) {
                    return; // Exit if access token is not available
                }

                const playlistsData = await getPlaylists(accessToken);
                
                console.log(playlistsData)
                setPlaylists(playlistsData);
            } catch(error) {
                console.error('Error fetching playlists:', error);
            }
        }
        fetchPlaylists();
    }, [accessToken]); // Re-run on every accessToken change


    return (
        <>
        <h2 className="bg-red-500">Playlists</h2>
        </>
    )
}