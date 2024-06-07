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
                        <li onClick={nav}>About</li>
                        <li onClick={nav}>CalendarView</li>
                    </ul>
                </div>
            </div>

            <div id="header-search">
                <input
                    placeholder="Search..."
                    ref={searchInputRef}
                    type="text" />
                <button
                    onClick={handleClickSearch}>Search</button>
            </div>
            <div id="header-settings">
                <ul>
                    <li>Profile</li>
                    <li>Settings</li>
                </ul>
            </div>
        </div>
    )
}