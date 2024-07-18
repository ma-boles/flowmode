/*export const onSelectPreview = async(playlist, handleSetPreview, setAddedType, playSong, accessToken ) => {
    handleSetPreview(playlist.id, playlist.name);
    console.log('Preview util:', playlist.name);
    setAddedType('preview');
    await playSong(playlist.uri, accessToken);
};*/

export const onSelectPreview = (id, name) => {
    handleSetPreview(id, name);
    console.log('On select preview:', id, name);
};