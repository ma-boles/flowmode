import React from "react";

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
            <button onClick={handleButtonClick}>
                {actionType === 'move' ? `Add to ${targetShelf}`: 'Remove'}
            </button>
        </>
    );
};