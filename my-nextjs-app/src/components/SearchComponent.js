import React from "react"


export default function SearchComponent () {
    return (
            <div className="shadow-xl shadow-black">

                <div className="pb-12 flex justify-center">
                    <select className="p-2 px-4 bg-green-600 font-medium text-lg rounded-md">
                        <option>Select</option>
                        <option value="artist">Artist</option>
                        <option value="album">Album</option>
                        <option value="song">Song</option>
                        <option value="book">Book</option>
                        <option value="podcast">Podcast</option>
                        
                    </select>
                </div>
                
               <div className="bg-white flex items-center justify-center  rounded-md">
                    <div>
                        <input className="outline-none p-2 m-4 text-xl text-slate-800 	" type="text" placeholder="Title, Artist, Name..."></input>
                    </div>
                    <button className="p-3 mr-4 pl-10 pr-10 bg-green-600 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out"
                    onClick={() => {console.log('clicked!')}}
                    >Search</button>
                </div>
            </div>
    )
}
