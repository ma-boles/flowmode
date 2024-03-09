import React from "react"


export default function SearchBar() {
    return (
            <div className="shadow-xl shadow-black">
                
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
