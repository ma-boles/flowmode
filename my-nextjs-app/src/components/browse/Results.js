import React from "react";

export default function Results({ artists }) {

    /*if(!searchResults) {
        return <div>Loading...</div>;
    }*/

    return (
        <>
        <section className="bg-white ">
            <h1 className="mt-0 pt-0 text-slate-900 font-semibold">Results</h1>
                <p className="text-black">test1</p>
                <p className="text-black">test2</p>
                <ul>
                    {artists.map(artist => (
                        console.log('Artist:', artist),
                        <li key={artist.id}>
                            <h3>{artist.name}</h3>
                        </li>
                    ))}
                </ul>
        </section>
        </>
    )
}