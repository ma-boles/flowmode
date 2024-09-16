import React, { useSession } from "react";

export default function ProfilePlaylistCard({ playlist, displayStyle, onSelectFlow, onSelectRest, flowPlaylistId, restPlaylistId }) {

    const [addedType, setAddedType] = useState(null);
    const { data: session } = useSession();
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
    };

    return (
        <>
        <li key={playlist.id} className={`bg-gray-700 ${displayStyle === 'grid' ? 'playlistCard' : 'playlistCardList'}`}>

            <div /* image */className={` ${displayStyle === 'list' ? 'flex w-1/4' : 'div'}`}>
                {playlist.images && playlist.images[0] ? (
                    <img src={playlist.images[0].url}
                        alt={`Cover of ${playlist.name}`}
                        className={`${displayStyle === 'grid' ? 'playlistImg' : 'playlistImgList' }`}
                        />
                        ) : (
                            <div className={`flex justify-center items-center ${displayStyle === 'list' ? 'fallBackImgList' : 'fallBackImg'}`}>
                                <p className="fallBackText">No Image <br />Available</p>
                            </div>
                        )}
            </div>

            <div className="flex w-60">
                <div className="cursor-pointer m-auto w-full">
                    <ul className="text-center w-100 border border-solid border-gray-500 rounded-sm ">
                        <li className={`py-1 font-semibold border-b border-solid border-gray-500 hover:bg-blue-500 ${getButtonClass(isFlowAdded || addedType === 'flow')}`}
                            onClick={isFlowAdded || addedType === 'flow' ? null : handleFlowClick}>
                            {isFlowAdded || addedType === 'flow' ? 'Added' : 'Flow'} {isFlowAdded || addedType === 'flow' && <span className="checkmark"></span>}
                        </li>
                        <li className={`py-1 font-semibold border-b border-solid border-gray-500 ${getButtonClass(isRestAdded || addedType === 'rest')}`}
                            onClick={isRestAdded || addedType === 'rest' ? null : handleRestClick}>
                            {isRestAdded || addedType === 'rest' ? 'Added' : 'Rest'} {isRestAdded || addedType === 'rest' && <span className="checkmark"></span>}
                        </li>
                    </ul>
                </div>
                <button className=" ml-2 w-12 text-3xl font-bold cursor-pointer transform rotate-90">&#8230;</button>
            </div>

        </li>
        </>
    )
}