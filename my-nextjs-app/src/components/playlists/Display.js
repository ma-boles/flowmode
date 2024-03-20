import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import "@/app/styles/styles.css"
import { getPlaylists } from "@/app/lib/apiCall";
import { getUserOwnedPlaylists } from "@/app/lib/apiCall";


export default function Display() {

    const { data: session } = useSession();
    const accessToken = session?.accessToken;
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        async function fetchUserOwnedPlaylists() {
            try {
                if(!accessToken || !session || !session.user || !session.user.sub) {
                    return;
                }

                const playlistsData = await getUserOwnedPlaylists(accessToken);

                console.log('All Playlists:', playlistsData);

                // Filter playlists to include only ones owned by the user
                const userOwnedPlaylists = playlistsData.filter(playlist => {
                    return playlist.owner.id === session.user.sub;
                });

                console.log('User Owned Playlists:', userOwnedPlaylists);

                setPlaylists(userOwnedPlaylists)

            } catch(error) {
                console.log('Error fetching user-owned playlists:, error');
            }
        }
        fetchUserOwnedPlaylists();
    }, [accessToken, session]);

    {/*useEffect(() => {
        async function fetchPlaylists() {
            try {
                if(!accessToken) {
                    return; // Exit if access token is not available
                }

                const playlistsData = await getPlaylists(accessToken);

                console.log('All Playlists:', playlistsData);

                // Filter playlists to include only ones owned by user
                const userOwnedPlaylists = playlistsData.filter(playlist => {
                   s
                    return playlist.owner.id === session.user.sub;
                });


                console.log('User Owned Playlists:', userOwnedPlaylists);

                setPlaylists(userOwnedPlaylists);
            } catch(error) {
                console.error('Error fetching playlists:', error);
            }
        }
        fetchPlaylists();
    }, [accessToken]); // Re-run on every accessToken or session change*/}


    return (
        <>
        <h2 className="bg-red-500">Playlists</h2>
        </>
    )
}