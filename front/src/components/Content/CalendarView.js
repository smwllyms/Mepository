import "./CalendarView.css"

import React from "react"

import * as CalendarAPI from "api/Calendar/calendar.js"

export default function CalendarView(props)
{
    // Current time
    // - 0: today
    // - 1: week
    // - 2: month
    const [time, setTime] = React.useState(0)

    return (
        <div id="calendar-view">
            <div id="cv-header">
                <ul id="time">
                    <li>Today</li>
                    <li>This Week</li>
                    <li>This Month</li>
                </ul>

                <a>Add +</a>
            </div>
            <div id="cv-view">
                
            </div>
        </div>
    )
}