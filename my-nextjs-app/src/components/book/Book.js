import React from "react";
import { useShelfContext } from "@/app/contexts/ShelfContext";


export default function Book({ isEllipsisVisible }) {

    const { shelves } = useShelfContext();

    const ellipsisStyles = {
        display: isEllipsisVisible ? 'block' : 'none',
    };

    const allBooks = Object.keys(shelves).flatMap((shelfName) => shelves[shelfName]);

    if(allBooks.length === 0) {
        return 
    }

    return (
        <div>
            <div className="inline text-center">
                {allBooks.map((book) => (
                    <div key={book.id} className="mt-4 mr-4 ml-4 text-center w-48 h-72 rounded-lg book--card">
                    <img src="/image-solid.svg" alt="book cover" className="mx-auto h-40"></img>
                    <div className="text-left mx-4">
                    {book.title && <> {book.title}<br/></>}
                    {book.author && <>{book.author}<br/><br/></>}
                    <strong><p className="book--p--time">{book.book_time}</p></strong>
                    </div>
                </div>
              ))}
                <br/>
                
            </div>
        </div>
    );
};

/*return (
    <div>
        <div className="inline text-center">
            <div className="mt-4 mr-4 ml-4 text-center w-48 h-72 rounded-lg book--card">
                <img src="/image-solid.svg" alt="book cover" className="mx-auto h-40"></img>
                <div className="text-left mx-4">
                    {book.title}<br/>
                    {book.author}<br/><br/>
                    <strong><p className="book--p--time">{book.book_time}</p></strong>
                </div>
            </div>
            <br/>
        </div>
    </div>
)
}*/