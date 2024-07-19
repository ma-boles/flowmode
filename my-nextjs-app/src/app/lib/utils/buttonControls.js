/*export const onSelectPreview = async(playlist, handleSetPreview, setAddedType, playSong, accessToken ) => {
    handleSetPreview(playlist.id, playlist.name);
    console.log('Preview util:', playlist.name);
    setAddedType('preview');
    await playSong(playlist.uri, accessToken);
};*/
/**import { usePlaylistContext } from "@/app/contexts/PlaylistContext";

const { handleSetFlowPlaylist, handleSetRestPlaylist, handleSetPreview } = usePlaylistContext();

export const onSelectPreview = (id, name) => {
    handleSetPreview(id, name);
    console.log('On select preview:', id, name);
};

export const onSelectFlow = (id, name) => {
    handleSetFlowPlaylist(id, name);
    console.log('Select flow:', id, name);
};

export const onSelectRest = (id, name) => {
    handleSetRestPlaylist(id, name);
    console.log('Select rest:', id, name);
};*/