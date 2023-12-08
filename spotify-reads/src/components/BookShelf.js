import React, { useEffect, useState } from "react";
import { useShelfContext } from "./ShelfContext";
import Book from "./Book";
import EllipsisButton from "./EllipsisButton";
import "../styles/Shelf.css"


export default function BookShelf({ id, book, books, onMoveBook, onRemove, shelfName }){
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
                        onMoveBook={onMoveBook} 
                        shelfName={shelfName}
                        />
                        <EllipsisButton 
                        book={book}
                        id={id}
                        shelfName="bookshelf"
                        onRemove={handleRemoveClick}
                        onEllipsisClick={(isEllipsisVisible) => 
                        handleEllipsisClick(book.id, isEllipsisVisible)}/>
                    </div>
                ))}
            </div>
        </>
    );
}
