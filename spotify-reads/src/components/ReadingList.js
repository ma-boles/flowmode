import React from "react";
import Book from "./Book";
import "../styles/Shelf.css"

export default function ReadingList() {
    return (
        <>
            <div className="readinglist--container">
                <Book />
                <Book />
                <Book />
                <Book />
                <Book />
                <Book />
                <Book />

            </div>
        </>
    )
}
