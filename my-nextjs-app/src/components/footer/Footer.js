import React from "react";

export default function Footer () {
    const getCurrentYear = () => {
        return new Date().getFullYear();
    };

    return (
        <div>
            <div>
                <hr className="mx-auto opacity-60 footer--hr"></hr>
                <p className="m-8 text-right">&copy; mboles.dev {getCurrentYear()} </p>
            </div>
        </div>
    )
}