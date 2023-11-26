import React from "react";
import BookSection from "./BookSection";

export default function BookShelf({ title, onAdd, onRemove }) {
    const shelfBooks = [
        { id: 'book1', title:"Book 1", author:"Author 1", book_time:"10hr 25min" },
        { id: 'book2', title:"Book 2", author:"Author 2", book_time:"10hr 25min" }
    ]
    
    return (
        <>
            <div className="bookshelf--container">
                <BookSection books={shelfBooks}/>
            </div>
        </>
    )
}
