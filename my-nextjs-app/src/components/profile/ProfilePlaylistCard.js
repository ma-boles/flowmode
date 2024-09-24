import React, { useSession, useState } from "react";

export default function ProfilePlaylistCard({ playlist, onSelectFlow, onSelectRest, flowPlaylistId, restPlaylistId }) {

    /*const [addedType, setAddedType] = useState(null);
    const { data: session } = useSession;
    const accessToken = session.accessToken;

    const handleFlowClick = () => {
        if (playlist.id === flowPlaylistId) {
            setAddedType(null);
        } else {
            onSelectFlow(playlist.id, playlist.name);
            setAddedType('flow');
        }
    };

    const handleRestClick = () => {
        if (playlist.id === restPlaylistId) {
            setAddedType(null);
        } else {
            onSelectRest(playlist.id, playlist.name);
            setAddedType('rest');
        }
    };*/

    const handleDeleteFav = () => {
        alert('Delete from favorites')
    };

    return (
        <>
            <div className="flex w-60">
                <div className="m-auto w-full">
                    <ul className="mx-2 w-100">
                        <li className="flex py-1 px-2 m-2 border border-white justify-between">
                            <span>Title 1</span>
                            <button className="px-1 bg-red-600 border border-white " onClick={handleDeleteFav}>
                                -
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}