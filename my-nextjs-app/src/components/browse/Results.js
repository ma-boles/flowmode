import React from "react";

export default function Results({ searchResults }) {
    return (
        <div className="mx-2 bg-blue-500 ">
                    <h1 className="mt-0 pt-0 text-slate-900 font-semibold">Results</h1>
                        {searchResults.map((artist, index) => (
                            <ul key={index}>
                                <li>{artist.name}</li>
                                <li>{artist.genre}</li>
                            </ul>
                        ))}
                </div>
    )
}