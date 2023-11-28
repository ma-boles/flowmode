import React from "react";
import Book from "./Book";

export default function BookShelf({ books, onMoveBook, onRemove }) {
    
    return (
        <>
            <div className="bookshelf--container">
                {books.map((book) => {
                    <Book key={book.id} book={book} onMoveBook={onMoveBook} onRemove={onRemove}
                    />
                })}
            </div>
        </>
    )
}
