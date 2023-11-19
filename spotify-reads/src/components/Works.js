import React from "react";
import "../styles/Works.css"

export default function Works() {
    return (
        <>
        <section className="works">

            <h1 className="works--h1">How it works</h1>

                <div className="works--container">
                    <div className="works--card">
                        <div className="works--number">
                            1<br/>
                        </div>
                        <h3 className="works--h3">Explore Spotify Catalogue:</h3>
                        <p> Browse the Spotify catalogue to discover a variety of books.</p>
                    </div>

                    <div className="works--card">
                        <div className="works--number">
                            2<br/>
                        </div>
                        <h3 className="works--h3">Build your Reading List:</h3>
                        <p> Add books to your reading list for easy access.</p>
                    </div>

                    <div className="works--card">
                        <div className="works--number">
                            3<br/>
                        </div>
                        <h3 className="works--h3">Organize Your Selection:</h3>
                        <p>Choose books from your reading list to either add to the queue or directly place them on your bookshelf.</p>
                    </div>

                    <div className="works--card">
                        <div className="works--number">
                            4<br/>
                        </div>
                        <h3 className="works--h3">Listen and Enjoy!</h3>
                        <p>Sit back, relax, and enjoy listening to selected books on Spotify.</p>
                    </div>
                </div>
                <a><button className="works--button">
                    Log In
                </button>
                </a>
            </section>
        </>
    )
}