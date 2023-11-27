import React from "react";
/*import BookSection from "./BookSection";*/
import ShelfSection from "./ShelfSection";

export default function BookShelf({ title, books }) {
    

    return (
        <>
            <div className="bookshelf--container">
                <ShelfSection 
                title={title}
                books={bookshelfBooks}
                onAddToBookshelf={handleAddToBookshelf}/>

            </div>
        </>
    )
}
/*
                <BookSection books={shelfBooks}
                onAddToBookshelf={handleAddToBookshelf}
                onAddToQueue={handleAddToQueue}
                onAddToReadingList={handleAddToReadingList}
                onRemove={handleRemove}/>*/