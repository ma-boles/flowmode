"use client"

import React, { useContext, createContext, useState } from "react";

const ShelfContext = createContext();

export const useShelfContext = () => {
    const context = useContext(ShelfContext);

    if(!context) {
        throw new Error("useShelfContext must be used within a ShelfProvider");
    }
    return context;
};

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


    // book add/remove logic

    const handleMoveBook = (book, currentShelf, targetShelf) => {
        setShelves((prevShelves) => {
            console.log('Moving book:', book);
            console.log('Current shelf:', currentShelf);
            console.log('Target shelf:', targetShelf);

            // create copies of the shelves
            const updatedShelves = {
                ...prevShelves,
                [currentShelf]: [...prevShelves[currentShelf]],
                [targetShelf]: [...prevShelves[targetShelf]],
            };

            //find indes of the book in current shelf
            const currentShelfIndex = updatedShelves[currentShelf].findIndex((b) => b.id === book.id);

            if(currentShelfIndex !== -1) {
                //remove the book from the current shelf
                const removedBook = updatedShelves[currentShelf].splice(currentShelfIndex,1)[0];
                //add the book to the target shelf
                updatedShelves[targetShelf].push(removedBook);
            } else {
                console.log('Book not found in shelf:', currentShelf);
                
            }
                console.log('Update shelves:', updatedShelves);
                return updatedShelves;
        });
           /* // create copy of shelves object 
            const updatedShelves = {...prevShelves};

            //log the current state of shelves
            console.log('Current state of shelves:', updatedShelves);

            //check if currentShelf exists in updatedShelves
            if(!updatedShelves[currentShelf]) {
                console.log(`Current shelf "${currentShelf}" does not exist in the shelves object.`)
                return prevShelves;
            }

            //find index of book in current shelf
            const currentShelfIndex = updatedShelves[currentShelf].findIndex((b) => {
                const bookId = Number(book.id);
                const currentBookId = typeof b.id !== 'undefined' && !isNaN(b.id) ? Number(b.id) : undefined;

                //log type and value of b.id
                console.log('Type of b.id:', typeof b.id, 'Value of b.id:', b.id);

                //check for NaN or undefined before comparison
                console.log('Comparing:', currentBookId, 'with', bookId, 'Result:', !isNaN(currentBookId) && !isNaN(bookId) && currentBookId === bookId);
                return !isNaN(currentBookId) && !isNaN(bookId) && currentBookId === bookId;
            });

            if(currentShelfIndex !== -1) {
                //remove the book from the current shelf
                const removedBook = updatedShelves[currentShelf].splice(currentShelfIndex, 1)[0];

                //check if trgetShelf exists
                if(updatedShelves[targetShelf]) {
                    //add the book to existing target shelf
                    updatedShelves[targetShelf].push(removedBook);
                } else {
                    console.log(`Target shelf "${targetShelf}" does not exist in the shelves object.`);
                }
            } else {
                console.log('Book not found in shelf:', currentShelf);
            }

            console.log('Updated shelves:', updatedShelves);
            return updatedShelves;

        });*/
   
};


const handleRemoveBook = (book, shelfName) => {
    setShelves((prevShelves) => {
        console.log('Removing book:', book)
        console.log('prevShelves:', prevShelves);
        console.log('shelfName:', shelfName);

    // create a copy of the shelves object
    const updatedShelves = {...prevShelves};

    // find the index of the book in the spcified shelf
    const shelfIndex = updatedShelves[shelfName].findIndex((b)=> {
        const bookId = Number(book.id);
        const currentBookId = typeof b.id !== 'undefined' && !isNaN(b.id) ? Number(b.id) : undefined;

        //log type and value of b.id
        console.log('Type of b.id:', typeof b.id, 'Value of b.id:', b.id);

        //check for NaN or undefined before comparison
        console.log('Comparing:', currentBookId, 'with', bookId, 'Result:', !isNaN(currentBookId) && !isNaN(bookId) && currentBookId === bookId);
        return !isNaN(currentBookId) && !isNaN(bookId) && currentBookId === bookId;
        });

    if(shelfIndex !== -1) {
        //remove the book from the shelf
        updatedShelves[shelfName].splice(shelfIndex, 1);
    } else {
        console.log('Book not found in shelf:', shelfName);
    }

    console.log('Updated shelves:', updatedShelves);

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