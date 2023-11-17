import React from "react";
import Logo from "../images/49131661.jpg"

export default function Landing() {
    return (
        <>
            <div className="header">
                <h1>Keep track of <br></br>
                your monthly <br></br>
                Spotify audiobooks
                </h1>
            </div>
            <img src={Logo} />
        </>
    )
}
