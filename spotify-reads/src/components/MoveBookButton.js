import React from "react";
import "../styles/Book.css"

export default function MoveBookButton({ book, targetShelf, actionType, onMoveBook, onRemove }) {

    const handleButtonClick = () => {
        if(actionType === 'move') {
            onMoveBook(book, targetShelf);
        } else if (actionType === 'remove') {
            onRemove(book);
        }
    };

    return(
        <>
            <button onClick={handleButtonClick} className="move--button">
                {actionType === 'move' ? `Add to ${targetShelf}`: 'Remove'}
            </button>
        </>
    );
};