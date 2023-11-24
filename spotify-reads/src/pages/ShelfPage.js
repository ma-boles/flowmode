import React, { useRef, useState } from "react";
import Nav from "../components/Nav";
import BookShelf from "../components/BookShelf";
import Queue from "../components/Queue";
import ReadingList from "../components/ReadingList";
import arrow from "../images/circle-arrow-up-solid.svg"

import Bookshelf from "../images/Bookshelf.jpg"
import "../styles/App.css";
import "../styles/Shelf.css"

export default function ShelfPage() {

    const [ bookshelfBooks, setBookshelfBooks ] = useState(['Book 1', 'Book 2']);
    const [ queueBooks, setQueueBooks ] = useState(['Book 3', 'Book 4']);
    const [ readingListBooks, setReadingListBooks ] = useState(['Book 5', 'Book 6']);

    const handleAddToShelf = (book, shelfSetter) => {
        shelfSetter((prevBooks) => [...prevBooks, book]);
    };

    const handleRemoveFromShelf = (book, shelfSetter) => {
        shelfSetter((prevBooks) => prevBooks.filter((b) => b !== book));
    };


    const bookshelfRef = useRef(null);
    const queueRef = useRef(null);
    const readinglistRef = useRef(null);

     const scrollToRef = (section) => {
        if(section === 'Bookshelf') {
            bookshelfRef.current.scrollIntoView({ behavior: 'smooth'});
        } else if (section === 'Queue') {
            queueRef.current.scrollIntoView({ behavior: 'smooth'});
        } else if (section === 'ReadingList') {
            readinglistRef.current.scrollIntoView({ behavior: 'smooth'});
        };
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return(
        <>
        <Nav scrollToRef={scrollToRef}/>

            <div className="shelf">
            <section className="img--section">
                <img src={Bookshelf} alt="astronaut lying down reading a book" className="shelf--img"></img>
            </section>

            <hr className="shelf--hr"/>

            <section className='bookshelf--section' ref={bookshelfRef}>
                <div className="shelf--time">
                    <strong><p>Total Time:</p>
                    00:00</strong>
                </div>
                <h2 className="bookshelf--h2">Bookshelf</h2>

                <BookShelf 
                title="Bookshelf"
                books={bookshelfBooks}
                onAdd={(book) => handleAddToShelf(book, setBookshelfBooks)}
                onRemove={(book) => handleRemoveFromShelf(book, setBookshelfBooks)}/>

                <div className="top--button--div">
                    <button className="top--button" onClick={scrollToTop}>
                        <img src={arrow} alt="scroll to top" className="img--arrow"></img>
                    </button>
                </div>
            </section>

            <hr className="shelf--hr"/>


            <section className='queue--section' ref={queueRef}>
                <div className="shelf--time">
                    <strong><p>Total Time:</p>
                    00:00</strong>
                </div>
                <h3 className="queue--h3">Queue</h3>

                <Queue 
                title="Queue"
                books={queueBooks}
                onAdd={(book) => handleAddToShelf(book, setQueueBooks)}
                onRemove={(book) => handleRemoveFromShelf(book, setQueueBooks)}/>

                <div className="top--button--div">
                    <button className="top--button" onClick={scrollToTop}>
                        <img src={arrow} alt="scroll to top" className="img--arrow"></img>
                    </button>
                </div>
            </section>

            <hr className="shelf--hr"/>

            <section className='readinglist--section' ref={readinglistRef}>
                <h3 className="readinglist--h3">Reading List</h3>

                <ReadingList 
                title="Reading List"
                books={readingListBooks}
                onAdd={(book) => handleAddToShelf(book, setReadingListBooks)}
                onRemove={(book) => handleRemoveFromShelf(book, setReadingListBooks)}/>

                <div className="top--button--div">
                    <button className="top--button" onClick={scrollToTop}>
                        <img src={arrow} alt="scroll to top" className="img--arrow"></img>
                    </button>
                </div>
            </section>
        </div>
        </>
    )
}
 