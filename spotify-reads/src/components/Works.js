import React from "react";


export default function Works() {
    return (
        <>
        <section className="text-center">

            <h1 className="mb-6 pb-4">How it works</h1>

                <div className="inline-flex flex-wrap">
                    <div className="m-8 p-8 w-64 h-68 rounded-lg works--card">
                        <div className="mx-auto mb-3 w-12 border-2 border-single border-white">
                            1<br/>
                        </div>
                        <h3 className="mb-2 font-bold">Explore Spotify Catalogue:</h3>
                        <p> Browse the Spotify catalogue to discover a variety of books.</p>
                    </div>

                    <div className="m-8 p-8 w-64 h-68 rounded-lg works--card">
                        <div className="mx-auto mb-3 w-12 border-2 border-single border-white">
                            2<br/>
                        </div>
                        <h3 className="mb-2 font-bold">Build your Reading List:</h3>
                        <p> Add books to your reading list for easy access.</p>
                    </div>

                    <div className="m-8 p-8 w-64 h-68 rounded-lg works--card">
                        <div className="mx-auto mb-3 w-12 border-2 border-single border-white">
                            3<br/>
                        </div>
                        <h3 className="mb-2 font-bold">Organize Your Selection:</h3>
                        <p>Choose books from your reading list to either add to the queue or directly place them on your bookshelf.</p>
                    </div>

                    <div className="m-8 p-8 w-64 h-68 rounded-lg works--card">
                        <div className="mx-auto mb-3 w-12 border-2 border-single border-white">
                            4<br/>
                        </div>
                        <h3 className="mb-2 font-bold">Listen and Enjoy!</h3>
                        <p>Sit back, relax, and enjoy listening to selected books on Spotify.</p>
                    </div>
                </div>
                <div>
                <a><button className="py-2 px-20 mt-10 mb-6 bg-transparent border-2 border-double border-white rounded-full">
                    Log In
                </button>
                </a>
                </div>
                
            </section>
            
        </>
    )
}