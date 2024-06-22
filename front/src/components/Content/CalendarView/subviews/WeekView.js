import React from "react"

import "./WeekView.css"

import * as CalendarAPI from "api/Calendar/calendar.js"

import { UserDataContext } from "App"

import Week from "./Week"
import EntryViewer from "./EntryViewer";
import TextInput from "./Inputs/TextInput";

export default function WeekView (props)
{

    // User Data context
    const userData = React.useContext(UserDataContext);
    const currentWeek = CalendarAPI.getPastSunday(props.date);

    // Get user data for specified dates
    const weekItems = userData.data.week[currentWeek.toLocaleDateString()] || [];

    const weekDays = CalendarAPI.getWeek(currentWeek);

    const dayItems = weekDays.map(day => {
        return userData.data.day[day.toLocaleDateString()]
    })

    
    // Have it load a day view
    function onClickDay(date) {
        props.loadDay(date)
    }

    // Devise current week string
    let weekString = CalendarAPI.dateStringBuilder(weekDays[0]);

    // Format date for week entries
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const dateString = CalendarAPI.dateStringBuilder(date);
        const dayString = CalendarAPI.getDayName(date.getDay());
        return dayString + ", " + dateString;
    }

    // Handle submission (change date to sunday)
    function onSubmit(entry)
    {
        entry.date = currentWeek;
        props.safeSetUserData(1,entry)
    }

    // Check if today's date is after "actual" today
    function isValidDay(date)
    {
        // To determine if a day is valid
        let future = false;
        if (date > new Date())
        {
            future = true;
        } 

        return !future;
    }

    return (
        <div id="weekView">
            <h2>Week of {weekString}</h2>
            <Week 
                weekDays={weekDays}
                dayItems={dayItems}
                isValidDay={isValidDay}
                onClickDay={onClickDay}/>
            <h2>Entries for the week of {weekString}</h2>
            <EntryViewer 
                entryList={weekItems}
                formatDate={formatDate}/>
            <h2>Add an entry for this date below</h2>
            <TextInput
                onSubmit={onSubmit} />
        </div>
    )
}
