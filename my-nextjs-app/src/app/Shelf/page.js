/*import React, { useEffect, useRef, useState } from "react";
import { ShelfProvider } from "../components/ShelfContext";
import { useShelfContext } from "../components/ShelfContext";
import Nav from "../components/Nav";
import BookShelf from "../components/BookShelf";
import Queue from "../components/Queue";
import ReadingList from "../components/ReadingList";
import arrow from "../images/circle-arrow-up-solid.svg";

import Collection from "../images/Collection.jpg";


export default function Shelf() {
    const { shelves, handleMoveBook, handleRemoveBook, setShelves: setShelvesContext } = useShelfContext();

    useEffect(() => {
        console.log('Shelves updated:', shelves);
    }, [shelves]);
    
    return(
        <ShelfProvider>
            <div>
                <ShelfPageContent setShelvesContext={setShelvesContext}/>
            </div>
        </ShelfProvider>
    )
};

function ShelfPageContent ({ setShelvesContext, id }) {

    const { shelves, handleMoveBook, handleRemoveBook } = useShelfContext();

    
//function to calculate total time for shelf
const calculateTotalTime = (books) => {
    let totalHours = 0;
    let totalMinutes = 0;

    for (const book of books) {
        const [hoursStr, minutesStr] = book.book_time.split('hr ');

        // extract hours
        const hours = parseInt(hoursStr, 10) || 0;
        totalHours += hours;

        //extract minutes
        const minutesMatch = minutesStr.match(/\d+/); //extract digits from string
        const minutes = parseInt(minutesMatch, 10) || 0;
        totalMinutes += minutes;
    }

    totalHours += Math.floor(totalMinutes/60);
    totalMinutes %= 60;

    return {
        hours: totalHours, 
        minutes: totalMinutes,
    };
};

//function to update the total time for each shelf
const updateTotalTimes = (updatedShelves) => {
    const newShelves  = {...updatedShelves};

    for (const shelf in newShelves) {
        newShelves[shelf].totalTime = calculateTotalTime(newShelves[shelf]);
    }
    setShelvesContext(newShelves);
};

useEffect(() => {
    updateTotalTimes(shelves);
}, [shelves]);


// scroll logic
    const bookshelfRef = useRef(null);
    const queueRef = useRef(null);
    const readingListRef = useRef(null);

     const scrollToRef = (section) => {
        if(section === 'Bookshelf') {
            bookshelfRef.current.scrollIntoView({ behavior: 'smooth'});
        } else if (section === 'Queue') {
            queueRef.current.scrollIntoView({ behavior: 'smooth'});
        } else if (section === 'ReadingList') {
            readingListRef.current.scrollIntoView({ behavior: 'smooth'});
        };
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };


    return (
        <>
        <Nav scrollToRef={scrollToRef}/>

    <div className="shelf">
        <section className="mx-auto w-full max-w-5xl  min-h-screen h-auto pb-8 flex items-center justify-center">
            <img src={Collection} alt="astronaut lying down reading a book" className="w-full h-auto"></img>
        </section>

    <hr className="mx-auto shelf--hr"/>

    <section className="pb-6 bg-transparent" ref={bookshelfRef}>
    <div className="mr-8 mt-4 text-right">
        <strong><p>Total Time:</p>
        {shelves.bookshelf && shelves.bookshelf.totalTime ? `${shelves.bookshelf.totalTime.hours}hr ${shelves.bookshelf.totalTime.minutes}min` : '00:00' }</strong>
    </div>
    <h2 className="mt-2 ml-12 font-semibold">Bookshelf</h2>

        <BookShelf 
        title="Bookshelf"
        id={id}
        books={shelves.bookshelf}
        onMoveBook={handleMoveBook}
        onRemove={handleRemoveBook}
        shelfName="bookshelf"
        />    
        
</section>

    <div className="mb-9 mr-8 mt-12 text-right">
        <button className="bg-transparent cursor-pointer rounded-full" onClick={scrollToTop}>
            <img src={arrow} alt="scroll to top" className="h-12 img--arrow"></img>
        </button>
    </div>

<hr className="mx-auto shelf--hr"/>

<section className="m-8 mb-12 pb-16 overflow-auto ms-overflow-style-none scrollbar-none queue--section" ref={queueRef}>
    <div className="mr-2 mt-0 text-right">
        <strong><p>Total Time:</p>
        {shelves.queue && shelves.queue.totalTime ? `${shelves.queue.totalTime.hours}hr ${shelves.queue.totalTime.minutes}min` : '00:00' }</strong>
    </div>
    <h3 className="ml-4 mb-4 font-semibold">Queue</h3>

        <Queue 
        title="Queue"
        id={id}
        books={shelves.queue}
        onMoveBook={handleMoveBook}
        onRemove={handleRemoveBook}
        shelfName="queue"
        />
</section>

    <div className="mb-9 mr-8 mt-12 text-right">
        <button className="bg-transparent rounded-full" onClick={scrollToTop}>
            <img src={arrow} alt="scroll to top" className="h-12 img--arrow"></img>
        </button>
    </div>

<hr className="mx-auto shelf--hr"/>

<h3 className="ml-12 mt-12">Reading List</h3>

<section className='m-8 mb-0 pb-16 overflow-auto ms-overflow-style-none scrollbar-none readinglist--section' ref={readingListRef}>


        <ReadingList 
        title="Reading List"
        id={id}
        books={shelves.readingList}
        onMoveBook={handleMoveBook}
        onRemove={handleRemoveBook}
        shelfName="readingList"
        />
</section>

    <div className="mt-12 mr-8 text-right">
        <button className="bg-transparent rounded-full" onClick={scrollToTop}>
            <img src={arrow} alt="scroll to top" className="h-12 img--arrow"></img>
        </button>
    </div>

</div>
        </>
    );
};
*/

import React from 'react'

export default function page() {
  return (
    <div>test page</div>
  )
}


