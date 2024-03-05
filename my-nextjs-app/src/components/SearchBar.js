import React from "react"


export default function SearchBar() {
    return (
            <div className="shadow-xl shadow-slate-900">
                <div className="bg-white flex items-center justify-center  rounded-md">
                    <div>
                        <input className="outline-none p-2 m-4 text-xl text-slate-800 	" type="text" placeholder="Title, Artist, Name..."></input>
                    </div>
                    <button className="p-3 mr-4 pl-10 pr-10 bg-green-500 rounded-md">Search</button>
                </div>
            </div>
    )
}
