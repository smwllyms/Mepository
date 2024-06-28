import * as CalendarAPI from "api/Calendar/calendar.js"

import "./Week.css"

export default function Week (props)
{
    return (
        <div className="week">
            {props.weekDays.map((date, i) => {

                const day = CalendarAPI.getDayName(date.getDay());
                const month = CalendarAPI.getMonthName(date.getMonth());
                const dateNumber = date.getDate();

                // Determine if we should display number of items (> 0)
                let todaysItems = props.dayItems[i] || [];
                let areEntries = todaysItems.length > 0;
                let numEntriesText = 
                    areEntries ? `- ${todaysItems.length} entries` : "";

                // Determine if valid day
                const isValidDay = props.isValidDay(date);

                return (
                <div key={i}
                    onClick={!isValidDay ? null : ()=>props.onClickDay(date)}
                    className={`weekDay ${!isValidDay ? "invalid-day" : ""}`}>
                    <div className="dateLabel">
                        <span>{`${day.substring(0,3)}`}</span>
                        <span>{`${dateNumber}`}</span>
                    </div>
                    <div>
                        <span>{numEntriesText}</span>
                    </div>
                </div>)
            })}
        </div>
    )
}