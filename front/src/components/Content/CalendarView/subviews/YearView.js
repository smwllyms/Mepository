import React from "react"

import "./YearView.css"

import * as CalendarAPI from "api/Calendar/calendar.js"
import { UserDataContext } from "App"

export default function YearView (props)
{
    // User Data context
    const userData = React.useContext(UserDataContext);
    const currentYear = props.date;

    // const monthItems = userData.data.month[currentYear.toLocaleDateString()];
    // const weekItems = userData.data.week[currentYear.toLocaleDateString()];
    // const dayItems = userData.data.day[currentYear.toLocaleDateString()];

    // // Have it load the week
    // function onClickDay(date) {
    //     props.loadWeek(CalendarAPI.getPastSunday(date))
    // }

    // // Devise current week string
    // let monthString = "";
    // {
    //     monthString += CalendarAPI.getMonthName(currentMonth.getMonth());
    //     monthString += " ";
    //     monthString += currentMonth.getFullYear();
    // }

    // // To determine if a day is valid
    // function isValidDay(date)
    // {
    //     // Check if today's date is after "actual" today
    //     let future = false;
    //     if (date > new Date())
    //     {
    //         future = true;
    //     } 

    //     // See if within the month
    //     let isThisMonth = date.getMonth() === currentMonth.getMonth();

        
    //     return !future && isThisMonth;
    // }

    const months = CalendarAPI.getMonths();
    const monthDates = CalendarAPI.getMonthDates(currentYear.getUTCFullYear());

    function onClickMonth(date)
    {
        props.loadMonth(date)
    }

    return (
        <div id="yearView">
            <h2>Year of {currentYear.getUTCFullYear()}</h2>
            {
                months.map((month, i) => {

                    // const dayItems = week.map(day => {
                    //     return userData.data.day[day.toLocaleDateString()]
                    // })
                    const validMonth = monthDates[i] <= CalendarAPI.getFirstOfMonth(new Date());

                    return (
                        <div 
                            key={i}
                            className={`month ${validMonth ? "valid" : ""}`}
                            onClick={validMonth ? ()=>onClickMonth(monthDates[i]) : null}>
                            <span>{month}</span>
                            <div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}