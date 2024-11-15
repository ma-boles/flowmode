import React from "react";

export default function TemplateForm () {

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formData = new FormData(e.taget);
        const title = formData.get("title")?.trim();
        const flow = formData.get("flow")?.trim();
        const rest = formData.get("rest")?.trim();

        if(!flow || !rest) {
            alert("Both Flow and Rest fields are required.");
            return;
        }

        const dataToSend = {
            title: title || undefined, // Title optional
            flow,
            rest
        };

        console.log("Data to send:", dataToSend);

        // API request
        try {
            const response = await fetch('/api/add-template', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if(response.ok) {
                const result = await response.json();
                console.log('API response:', result);
                alert('Template saved successfully');
            } else {
                const errorData = await response.json();
                console.log('API Error:', errorData);
                alert(`Error: ${errorData.error || "Failed to save the template."}`);
            }
        } catch (error) {
            console.error("Network Error:", error);
            alert("An error occurred while saving the template. Please try again.");
        }
    };


    return (
        <>
            <div className="p-2 bg-black bg-opacity-30 rounded-md">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title" className="font-semibold">Title: </label>
                    <input
                        type="text"
                        name="name"
                        className="m-1 bg-transparent border-b border-white"
                    />
                    <br />
                    <label htmlFor="title" className="font-semibold">Flow: </label>
                    <input
                        type="text"
                        name="flow"
                        className="bg-transparent border-b border-white"
                        required
                    />
                    <br />
                    <label htmlFor="title" className="font-semibold">Rest: </label>
                    <input
                        type="text"
                        name="rest"
                        className="m-1 bg-transparent border-b border-white"
                        required
                    />
                    <br />
                    <button className="mb-1 mt-2 w-full bg-blue-700 border border-white" type="submit">Save</button>
                </form>
            </div>
        </>
    )
}