import React, { useContext, useEffect, useState } from "react";
import { useShelfContext } from "./ShelfContext";
import Book from "./Book";
import EllipsisButton from "./EllipsisButton";
import "../styles/Shelf.css"


export default function BookShelf({ id, book, books, onMoveBook, onRemove, currentShelf, targetShelf, shelfName }){
    const { handleMoveBook } = useShelfContext();
    const { handleRemoveBook } = useShelfContext();

    useEffect(() => {
        console.log('Received books:', books);
    }, [books]);

    const [ bookEllipsisVisibility, setBookEllipsisVisibility ] = useState({});

    const handleEllipsisClick =(bookId, isEllipsisVisible) => {
        setBookEllipsisVisibility((prevVisibility) => ({
            ...prevVisibility,
            [bookId]: isEllipsisVisible,
        }));
    };

    const handleMoveClick = (book) => {
        handleMoveBook(book, currentShelf, targetShelf);
    };

    const handleRemoveClick = (book) => {
        handleRemoveBook(book, shelfName);
    };
    
    return (
        <>
            <div className="bookshelf--container">
                {books.map((book) => (
                    <div key={book.id} className="ellipsis--div">
                        <Book 
                        key={book.id} 
                        id={book.id}
                        book={book} 
                        onMoveBook={handleMoveClick} 
                        shelfName={shelfName}
                        />

                        <EllipsisButton 
                        book={book}
                        id={id}
                        shelfName="bookshelf"
                        onRemove={handleRemoveClick}
                        onMoveBook={handleMoveClick}
                        onEllipsisClick={(isEllipsisVisible) => 
                        handleEllipsisClick(book.id, isEllipsisVisible)}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
