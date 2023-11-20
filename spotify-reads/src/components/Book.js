import React from "react";
import ellipsis from "../images/ellipsis-solid.svg"

export default function Book() {
    return (
        <>
            <div className="book--container">
                book img<br/>
                book title<br/>
                author<br/>
            <img src={ellipsis} alt="ellipsis" className="book--ellipsis"></img>
            </div>
        </>
    )
}