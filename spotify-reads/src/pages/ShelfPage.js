import React, { useRef, useState } from "react";
import Nav from "../components/Nav";
import BookShelf from "../components/BookShelf";
import Queue from "../components/Queue";
import ReadingList from "../components/ReadingList";
import arrow from "../images/circle-arrow-up-solid.svg"

import Bookshelf from "../images/Bookshelf.jpg"
import "../styles/App.css";
import "../styles/Shelf.css"

export default function ShelfPage( handleAddToBookshelf, handleAddToQueue, handleAddToReadingList, handleRemoveFromBookshelf, handleRemoveFromQueue, handleRemoveFromReadingList ) {

// book data
    const [ bookshelfBooks, setBookshelfBooks ] = useState([
        { id: 'book1', title:"Book 1", author:"Author 1", book_time:"10hr 25min" },
        { id: 'book2', title:"Book 2", author:"Author 2", book_time:"10hr 25min" }
    ]);
    const [ queueBooks, setQueueBooks ] = useState([
        { id: 'book5', title:"Book 5", author:"Author 5", book_time:"7hr 45min" },
        { id: 'book6', title:"Book 6", author:"Author 6", book_time:"7hr 45min" }
        ]);
    const [ readingListBooks, setReadingListBooks ] = useState([
        { id:'book3', title:"Book 3", author:"Author 3", book_time:"5hr 20min" },
        { id:'book4', title:"Book 4", author:"Author 4", book_time:"5hr 20min" }
        ]);



// scroll logic
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
                onAddToBookshelf={handleAddToBookshelf}
                onRemove={handleRemoveFromBookshelf}/>

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
                onAddToQueue={handleAddToQueue}
                onRemove={handleRemoveFromQueue}/>

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
                onAddToReadingList={handleAddToReadingList}
                onRemove={handleRemoveFromReadingList}/>

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
 
   /*const handleAddToShelf = (book, shelfSetter) => {
        shelfSetter((prevBooks) => [...prevBooks, book]);
    };

    const handleRemoveFromShelf = (book, shelfSetter) => {
        shelfSetter((prevBooks) => prevBooks.filter((b) => b !== book));
    };*/