
function getMonthName(monthNumber)
{
    switch (monthNumber)
    {
        case 1: return "February";
        case 2: return "March";
        case 3: return "April";
        case 4: return "May";
        case 5: return "June";
        case 6: return "July";
        case 7: return "August";
        case 8: return "September";
        case 9: return "October";
        case 10: return "November";
        case 11: return "December";
        default: return "January";
    }
}
function getDayName(dayNumber)
{
    switch (dayNumber)
    {
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
        default: return "Sunday";
    }
}

// Get the past Sunday
function getPastSunday(date)
{
    while (getDayName(date.getDay()) !== "Sunday")
    {

        date = new Date(date.getTime() - 1 * 24 * 60 * 60 * 1000);

    }
    return date;
}

function getWeek(date)
{
    // We must ensure we are on a sunday
    date = getPastSunday(date);

    // Now create list of days
    const dates = [];
    for (let i = 0; i < 7; i++)
    {
        dates.push(new Date(date.getTime() + i * 24 * 60 * 60 * 1000))
    }
    return dates;
}

function getMonth(date)
{
    // We have to find the extremeties of the Month
    let currentMonth = date.getUTCMonth();
    let latestDate = date;

    // Go until we are into the next month
    while (latestDate.getMonth() === currentMonth)
    {
        latestDate = new Date(latestDate.getTime() + 24 * 60 * 60 * 1000);
    }
    // Subtract one
    latestDate = new Date(latestDate.getTime() - 24 * 60 * 60 * 1000);

    // Now go to the next Saturday (end of last week)
    while (getDayName(latestDate.getDay()) !== "Saturday")
    {
        latestDate = new Date(latestDate.getTime() + 24 * 60 * 60 * 1000);
    }

    // Now find the earliest date
    let earliestDate = date;
    while (earliestDate.getMonth() === currentMonth)
    {
        earliestDate = new Date(earliestDate.getTime() - 24 * 60 * 60 * 1000);
    }

    // Add one to get back into the month
    earliestDate = new Date(earliestDate.getTime() + 24 * 60 * 60 * 1000);

    // Now go to the first Sunday (Start of week)
    while (getDayName(earliestDate.getDay()) !== "Sunday")
    {
        earliestDate = new Date(earliestDate.getTime() - 24 * 60 * 60 * 1000);
    }

    // Now we build the weeks
    const monthWeeks = [];

    while (earliestDate < latestDate)
    {
        monthWeeks.push(getWeek(earliestDate));
        earliestDate = new Date(earliestDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    } 

    // Now we have our bounds, collect all the days
    const monthDays = monthWeeks.flatMap(day=>day);

    return [monthDays, monthWeeks];
}

// For navigation
function nextWeek(direction, date) 
{
    return new Date(date.getTime() + 7 * direction * 24 * 60 * 60 * 1000)
}
function nextMonth(direction, date)
{
    // We actually need to know the number of days of the month lol
    // So we'll just do it differently by going until the month changes
    let currentMonth = date.getUTCMonth();
    do {
        date = nextWeek(direction, date);
    }
    while (date.getUTCMonth() === currentMonth);

    return date;
}
function nextDay(direction, date)
{
    return new Date(date.getTime() + direction * 24 * 60 * 60 * 1000)
}

// Date builder
function dateStringBuilder(date)
{
    let dateString = "";
    dateString += getMonthName(date.getMonth());
    dateString += " ";
    dateString += date.getDate();
    dateString += ", ";
    dateString += date.getFullYear();

    return dateString;
}

export { getMonthName, getDayName, getWeek, getMonth, nextWeek, nextMonth, nextDay, getPastSunday, dateStringBuilder }