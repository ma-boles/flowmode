import React from "react";
import BookSection from "./BookSection";
import "../styles/Shelf.css"

export default function ReadingList() {
    const books = [
        
    ]
    return (
        <>
            <div className="readinglist--container">
                <BookSection books={books}/>
            </div>
        </>
    )
}
