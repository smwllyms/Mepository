import "./Header.css"

import React from "react"

export default function Header(props)
{
    // Ref for search input
    const searchInputRef = React.useRef();

    // Handle Navigation
    function nav(e)
    {
        props.nav(e.target.textContent)
    }

    // Handle click search
    function handleClickSearch()
    {
        console.log("searching for " + searchInputRef.current.value)
    }

    return (
        <div id="header">
            <div id="header-left-pane">
                <h3 id="header-site-logo">
                    Mepository
                </h3>
                <div id="header-nav">
                    <ul>
                        <li className={props.currentPageId === 0 ? "current" : ""} onClick={nav}>About</li>
                        <li className={props.currentPageId === 1 ? "current" : ""}onClick={nav}>CalendarView</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}