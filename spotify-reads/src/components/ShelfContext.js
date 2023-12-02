import React, { createContext, useState } from "react";

const ShelfContext = createContext();

const ShelfProvider = ({ children }) => {
    const [ shelves, setShelves ] = useState({
        bookshelf: [
            { id: 1, title:"Book 1", author:"Author 1", book_time: "10hr 25min"},
            { id: 2, title:"Book 2", author:"Author 2", book_time:"10hr 25min" }
        ],
        queue: [
            { id: 5, title:"Book 5", author:"Author 5", book_time:"7hr 45min" },
            { id: 6, title:"Book 6", author:"Author 6", book_time:"7hr 45min" }
        ],
        readingList: [
            { id: 3, title:"Book 3", author:"Author 3", book_time:"5hr 20min" },
            { id: 4, title:"Book 4", author:"Author 4", book_time:"5hr 20min" }
            ],
    });


const handleMoveBook = (book, targetShelfIndex) => {
    //find index of book in current shelf
    const currentShelfIndex = shelves.findIndex((shelf) => shelf.some((b) => b.id === book.id));
    //create copies of current and target shelves' book arrays
    const currentShelfBooks = [...shelves[currentShelfIndex]];
    const targetShelfBooks = [...shelves[targetShelfIndex]];
    
    // remove book from current shelf
    const currentIndex = currentShelfBooks.findIndex((b) => b.id === book.id);
    currentShelfBooks.splice(currentIndex, 1);
    // add book to target shelf
    targetShelfBooks.push(book);

    // update state with modified shelves
    setShelves((prevShelves) => {
        const updatedShelves = [...prevShelves];
        updatedShelves[currentShelfIndex] = currentShelfBooks;
        updatedShelves[targetShelfIndex] = targetShelfBooks;
        return updatedShelves;
    })
};

const handleRemoveBook = (book) => {
    setShelves((prevShelves) => {

    // find index of book in current shelf
    const currentShelfIndex = prevShelves.findIndex((shelf) => shelf.some((b) => b.id === book.id));

    if(currentShelfIndex === -1) {
        //book not found in and shelf
        return prevShelves;
    }

    // create copy of current shelf books array
    const currentShelfBooks = [...prevShelves[currentShelfIndex]];

    // remove book from its current shelf
    const currentIndex = currentShelfBooks.findIndex((b) => b.id === book.id);
    currentShelfBooks.splice(currentIndex, 1);
    
    // create a copy of the shelves array
    const updatedShelves = [...prevShelves];

    // update state with modified shelf
        updatedShelves[currentShelfIndex] = currentShelfBooks;

        return updatedShelves;
    });
};


const value = {
    shelves,
    setShelves,
    handleMoveBook,
    handleRemoveBook,
  };


    return <ShelfContext.Provider value={value}>{children}</ShelfContext.Provider>
};


export { ShelfProvider, ShelfContext };