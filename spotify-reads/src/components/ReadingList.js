import React from "react";
import BookSection from "./BookSection";
import "../styles/Shelf.css"

export default function ReadingList() {
    const books = [
        { id:'book3', title:"Book 3", author:"Author 3", book_time:"5hr 20min" },
        { id:'book4', title:"Book 4", author:"Author 4", book_time:"5hr 20min" }
    ]
    return (
        <>
            <div className="readinglist--container">
                <BookSection books={books}/>
            </div>
        </>
    )
}
