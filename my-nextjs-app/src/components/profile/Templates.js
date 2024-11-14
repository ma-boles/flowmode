import React from "react";

export default function Templates () {

    const sendToFlow = () => {
        alert('Sending template to flow player')
        // send saved titles to flow player
    };

    const expandTitle = () => {
        alert('Expanding title')
        // expand section to show details
    };
        return (
        <>
        <div className="p-4 bg-white bg-opacity-20 border border-white">
            <h1 className="mb-2 text-center font-bold text-xl opacity-90">Templates:</h1>
            <div className="my-2">
                <div className="p-2 w-full bg-blue-700 border border-white text-start" >
                    <ul className="flex font-bold justify-between">
                        <div /* buttons div */ className="flex">
                            <h2>Title </h2>
                            <button className="px-1 font-light" onClick={expandTitle}>v</button>
                        </div>
                            <button className="px-1 bg-black hover:bg-white rounded-md" onClick={sendToFlow}>+</button>
                    </ul>
                    <li><span className="font-semibold">Flow:</span> Flow Title</li>
                    <li><span className="font-semibold">Rest:</span> Rest Title</li>
                </div>
            </div>
            <div className="p-2 border border-white bg-black bg-opacity-10 rounded-sm">
                <form /* onSubmit={handleSubmit} */>
                    <label htmlFor="title" className="font-semibold">Title: </label>
                    <input 
                        type="text"
                        id="title"
                        name="name"
                        //value={formData.title}
                        //onChange={handleChange}
                        className="m-1 bg-transparent border-b border-white"
                    />
                    <br />
                    <label htmlFor="title" className="font-semibold">Flow: </label>
                    <input 
                        type="text"
                        id="flow"
                        name="flow"
                        //value={formData.title}
                        //onChange={handleChange}
                        className="bg-transparent border-b border-white"
                    />
                    <br />
                    <label htmlFor="title" className="font-semibold">Rest: </label>
                    <input 
                        type="text"
                        id="rest"
                        name="rest"
                        //value={formData.title}
                        //onChange={handleChange}
                        className="m-1 bg-transparent border-b border-white"
                    />
                    <br />
                    <button className="mb-1 mt-2 w-full bg-blue-700 border border-white"/*type="submit*/>Save</button>
                </form>
            </div>
        </div>
        </>
    )
}