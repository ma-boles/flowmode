import React from "react";
import Book from "./Book";
import "../styles/Shelf.css"

export default function ReadingList() {
    return (
        <>
            <div className="readinglist--container">
                <Book title="Book 3" author="Author 3" book_time="5hr 20min"/>
                <Book title="Book 4" author="Author 4" book_time="5hr 20min"/>
            </div>
        </>
    )
}
