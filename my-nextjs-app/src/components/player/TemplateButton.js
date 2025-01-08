import { usePlaylistContext } from "@/app/contexts/PlaylistContext";
import React from "react";

export default function TemplateButton () {

    const { flowPlaylistName, restPlaylistName, flowPlaylistId, restPlaylistId } = usePlaylistContext();
    const saveTemplate = async () => {
        //alert('Template saved!');
        //console.log(`Saving titles: Flow: ${flowPlaylistName}, Rest: ${restPlaylistName}`)

        // Send title to database via api route
        try {
            console.log(`Saving titles: Flow: ${flowPlaylistName}, ${flowPlaylistId}; Rest: ${restPlaylistName}, ${restPlaylistId}`);

            // Call the API to save template
            const response = await fetch('/api/template', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    flowPlaylistName,
                    flowPlaylistId,
                    restPlaylistName,
                    restPlaylistId
                })
            });

            if(!response.ok) {
                throw new Error('Failed to save template');
            }
            alert('Template saved!');
            console.log('Template saved successfully!');
        } catch (error) {
            console.error('Error saving template', error);
            alert('Failed to save template');
        }
    };
    return (
        <>
            <button className="px-8 py-2 m-2 bg-purple-700"onClick={saveTemplate}>Save</button>
        </>
    )
}