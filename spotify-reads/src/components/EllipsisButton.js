import React, { useState } from "react";
import ellipsis from "../images/ellipsis-solid.svg";
import MoveBookButton from "./MoveBookButton";


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
             <div className="w-40 hidden ml-8 rounded-md absolute z-10" id={`book--add ${id}`} style={ellipsisStyles}>

             <ul className="p-0 m-0">
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

                 <li className="m-0 w-full">
                     <MoveBookButton 
                     book={book} 
                     id={id}
                     actionType="remove" 
                     handleRemoveBook={handleRemoveClick} 
                     shelfName={shelfName}/>
                 </li>

             </ul>
         </div> 
        )}
        </>
    )
}