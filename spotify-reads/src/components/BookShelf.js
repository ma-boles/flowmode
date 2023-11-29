import React, { useState } from "react";
import Book from "./Book";
import EllipsisButton from "./EllipsisButton";
import "../styles/Shelf.css"


export default function BookShelf({ books, onMoveBook, onRemove }){

    const [ bookEllipsisVisibility, setBookEllipsisVisibility ] = useState({});

    const handleEllipsisClick =(bookId, isEllipsisVisible) => {
        setBookEllipsisVisibility((prevVisibility) => ({
            ...prevVisibility,
            [bookId]: isEllipsisVisible,
        }));
    };
    
    return (
        <>
            <div className="bookshelf--container">
                {books.map((book) => (
                    <div key={book.id} className="ellipsis--div">
                        <Book 
                        key={book.id} 
                        book={book} 
                        onMoveBook={onMoveBook} 
                        onRemove={onRemove}
                        />
                        <EllipsisButton 
                        onEllipsisClick={(isEllipsisVisible) => 
                        handleEllipsisClick(book.id, isEllipsisVisible)}/>
                    </div>
                ))}
            </div>
        </>
    )
}
