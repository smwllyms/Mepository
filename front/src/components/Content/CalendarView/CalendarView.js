import "./CalendarView.css"

import React from "react"

import * as CalendarAPI from "api/Calendar/calendar.js"

import DayView from "./subviews/DayView"
import WeekView from "./subviews/WeekView"
import MonthView from "./subviews/MonthView"
import YearView from "./subviews/YearView"

export default function CalendarView(props)
{
    // Current view type
    // - 0: day
    // - 1: week
    // - 2: month
    // - 3: year
    const [viewType, setViewType] = React.useState(1);

    // Current date (default: now)
    const [date, setDate] = React.useState(new Date());

    // Safe set view type function
    function safeSetViewType(_type, _date)
    {
        setViewType(_type);
        setDate(_date);
    }

    // Navigate date
    function nav(direction)
    {
        // Depends on our current view type
        switch (viewType)
        {
            case 1:
                // Week
                setDate(CalendarAPI.nextWeek(direction, date))
                break;
            case 2:
                // Month
                setDate(CalendarAPI.nextMonth(direction, date))
                break;
            case 3:
                // Year
                setDate(CalendarAPI.nextYear(direction, date))
                break;
            default:
                // Day
                setDate(CalendarAPI.nextDay(direction, date))
                break;
        }
    }

    // Get the view
    function getView()
    {
        switch (viewType) {
            case 1:
                return <WeekView 
                    date={date}
                    loadDay={e=>safeSetViewType(0,e)}
                    safeSetUserData={props.safeSetUserData}/>;
            case 2:
                return <MonthView 
                    date={date}
                    loadWeek={e=>safeSetViewType(1,e)}
                    safeSetUserData={props.safeSetUserData}/>;
            case 3:
                return <YearView
                    date={date}
                    loadMonth={e=>safeSetViewType(2,e)}/>;
            default:
                return <DayView 
                    date={date}
                    safeSetUserData={props.safeSetUserData}/>;
        }
    }

    return (
        <div id="calendar-view">
            <h2>Navigation</h2>
            <div id="cv-header">
                <ul id="time">
                    <li onClick={()=>safeSetViewType(0, new Date())}>Today</li>
                    <li onClick={()=>safeSetViewType(1, new Date())}>This Week</li>
                    <li onClick={()=>safeSetViewType(2, new Date())}>This Month</li>
                    <li onClick={()=>safeSetViewType(3, new Date())}>This Year</li>
                </ul>

                <ul id="time">
                    <li onClick={()=>nav(-1)}>{"<<"} Previous</li>
                    <li onClick={()=>nav(1)}>Next {">>"}</li>
                </ul>
            </div>
            <div id="cv-view">
                {
                    getView()
                }
            </div>
        </div>
    )
}