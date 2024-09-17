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

    return (
        <>
            <div className="flex w-60">
                <div className="m-auto w-full">
                    <ul className="mx-2 w-100 text-left">
                        <li className="py-1 m-2 border border-white indent-2">
                        Title 1</li>
                        <li className="py-1 m-2 border border-white indent-2">
                        Title 2</li>
                        <li className="py-1 m-2 border border-white indent-2">
                        Title 3</li>
                        <li className="py-1 m-2 border border-white indent-2">
                        Title 4</li>
                    </ul>
                </div>
            </div>
        </>
    )
}