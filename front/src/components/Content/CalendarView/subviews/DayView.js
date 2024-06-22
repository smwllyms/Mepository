import React from "react"

import * as CalendarAPI from "api/Calendar/calendar.js"

import { UserDataContext } from "App"

import TextInput from "./Inputs/TextInput";
import EntryViewer from "./EntryViewer";

export default function DayView (props)
{
    // User Data context
    const userData = React.useContext(UserDataContext);
    const currentDay = props.date;

    // Get user data for specified date
    const items = userData.data.day[currentDay.toLocaleDateString()] || [];

    // Devise current day string
    let dayString = "";
    {
        dayString += CalendarAPI.getDayName(currentDay.getDay())
        dayString += ", ";
        dayString += CalendarAPI.getMonthName(currentDay.getMonth());
        dayString += " ";
        dayString += currentDay.getDate();
        dayString += ", ";
        dayString += currentDay.getFullYear();
    }

    // Format date for day entries
    function formatDate(date) {
        console.log(date)
        return new Date(date).toLocaleTimeString();
    }

    return (
        <div id="dayView">
            <h2>Entries for {dayString}</h2>
            <EntryViewer 
                entryList={items}
                formatDate={formatDate}/>
            <h2>Add an entry for this date below</h2>
            <TextInput
                onSubmit={e=>props.safeSetUserData(0,e)} />
        </div>
    )
}