import React, { useState } from "react";
import ellipsis from "../images/ellipsis-solid.svg";
import MoveBookButton from "./MoveBookButton";
import "../styles/Book.css"


export default function EllipsisButton({ id, book, shelfName, onMoveBook, onRemove, currentShelf, targetShelf, children, onEllipsisClick, handleMoveClick, handleRemoveClick }) {
    
    // ellipsis click logic
    const [ isEllipsisVisible, setIsEllipsis ] = useState(false);
    
    const handleEllipsisClick = () => {
    setIsEllipsis(!isEllipsisVisible);
    onEllipsisClick(!isEllipsisVisible);
    };

    const ellipsisStyles = {
        display: isEllipsisVisible ? 'block' : 'none',
    };
    
    return(
        <>
        <img
        src={ellipsis} 
        alt="ellipsis" 
        className="book--ellipsis" 
        onClick={handleEllipsisClick}
        />

        {isEllipsisVisible && (
             <div className= "book--add" id={`book--add ${id}`} style={ellipsisStyles}>

             <ul className="addlist">

                 <li className="addlist--li">
                     <MoveBookButton 
                     book={book} 
                     targetShelf="bookshelf" 
                     currentShelf={shelfName}
                     actionType="move" 
                     handleMoveBook={handleMoveClick}/>
                 </li>
                 <li className="addlist--li">
                     <MoveBookButton 
                     book={book} 
                     targetShelf="queue" 
                     currentShelf={shelfName}
                     actionType="move" 
                     handleMoveBook={handleMoveClick}/>
                 </li>
                 <li className="addlist--li">
                     <MoveBookButton 
                     book={book} 
                     targetShelf="readingList"
                     currentShelf={shelfName} 
                     actionType="move" 
                     handleMoveBook={handleMoveClick}/>
                 </li>

                 <li className="addlist--remove">
                     <MoveBookButton 
                     book={book} 
                     id={id}
                     actionType="remove" 
                     handleRemoveBook={handleRemoveClick} shelfName={shelfName}/>
                 </li>

             </ul>
         </div> 
        )}
        </>
    )
}