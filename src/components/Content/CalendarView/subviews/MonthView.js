import React from "react"

import "./MonthView.css"

import * as CalendarAPI from "api/Calendar/calendar.js"
import { UserDataContext } from "App"

import Week from "./Week"
import EntryViewer from "./EntryViewer";
import TextInput from "./Inputs/TextInput";

export default function MonthView (props)
{
    // User Data context
    const userData = React.useContext(UserDataContext);
    const currentMonth = CalendarAPI.getFirstOfMonth(props.date);

    const monthItems = userData.data.month[currentMonth.toLocaleDateString()] || [];

    const [monthDays, monthWeeks] = CalendarAPI.getMonth(currentMonth);

    // Have it load the week
    function onClickDay(date) {
        props.loadWeek(CalendarAPI.getPastSunday(date))
    }

    // Devise current week string
    let monthString = "";
    {
        monthString += CalendarAPI.getMonthName(currentMonth.getMonth());
        monthString += " ";
        monthString += currentMonth.getFullYear();
    }

    // To determine if a day is valid
    function isValidDay(date)
    {
        // Check if today's date is after "actual" today
        let future = false;
        if (date > new Date())
        {
            future = true;
        } 

        // See if within the month
        let isThisMonth = date.getMonth() === currentMonth.getMonth();

        
        return !future && isThisMonth;
    }

    // Format date for month entries
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const dateString = CalendarAPI.dateStringBuilder(date);
        return dateString;
    }

    // Handle submission (change date to first of the month)
    function onSubmit(entry)
    {
        entry.tsEntry = entry.date;
        entry.tsID = currentMonth;
        props.safeSetUserData(2,entry)
    }

    return (
        <div id="monthView">
            <h2>Month of {monthString}</h2>
            {
                monthWeeks.map((week, i) => {

                    const dayItems = week.map(day => {
                        return userData.data.day[day.toLocaleDateString()]
                    })

                    return (
                        <Week 
                            key={i}
                            weekDays={week}
                            dayItems={dayItems}
                            isValidDay={isValidDay}
                            onClickDay={onClickDay}/>
                    )
                })
            }
            <h2>Entries this month</h2>
            <EntryViewer 
                entryList={monthItems}
                formatDate={formatDate}/>
            {
                (CalendarAPI.getFirstOfMonth(new Date()).toLocaleDateString() === currentMonth.toLocaleDateString() ) ? (
                    <div>
                        <h2>Add an entry for this month below</h2>
                        <TextInput
                            onSubmit={onSubmit} />
                        </div>
                ) : (<></>)
            }
        </div>
    )
}