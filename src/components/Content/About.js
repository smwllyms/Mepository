export default function About(props)
{
    return (
        <div id="about">
            <h1>About Mepository</h1>
            <hr/>
            <br/>
            <p>
                Mepository is a virtual journal for you to record your feelings, achievements, and notable events in your life,
                allowing you to reflect, learn, and grow as a person all in one place. 
            </p>
            <p>
                You are provided an interactive calendar to navigate and record your thoughts, feelings, and anything else you'd like to jot down. This can be done on the <b>CalendarView</b> page (accessible in the top navigation menu). 
            </p>
            <p>
            To make it front and center, this app currently <b>does not collect any of your data!</b> It is kept and retrieved from your web browser's cache.
            </p>
            <p>
                There, you may add as many <em>entries</em> as you'd like for each day, week and month, though only within the logical window timeframe.
            </p>
            <ul>
                <li>You may add entries for each day <em>only</em> during that day.</li>
                <li>You may add entries for a week <em>only</em> during that week.</li>
                <li>You may add entries for a month <em>only</em> during that month.</li>
            </ul>
            <p>To clarify, there are three difference types of entries: <em>day, week, and month entries.</em></p>
            <ul>
                <li><b>Day entries</b> are entries for a particular day. For example, you can write down how you feel at some moment during the day or while reflecting at night (but not too late!)</li>
                <li><b>Week entries</b> are entries to be recorded at <em>any</em> time during the week. For example, you can write about your anticipation for an event upcoming during the week, or make a week-long reflection on Saturday.</li>
                <li><b>Month entries</b> are entries meant to be understood within the broader context of a month. For example, maybe you are starting a month long detox of sugar! Or, maybe you are analyzing the different stages of growing your beard out!</li>
            </ul>
            <p>This app was inspired largely by Rob Dyrdek in <a href="https://youtu.be/c_4AkNra_M8?si=dbhcd7nL0xtGWQVS&t=2015">this interview</a>, with an emphasis on having somewhere accessible and easy to naviate to record and later reflect on your experiences through life, on a variety of temporal scales.</p>
            <p>This app is being developed by <a href="https://smwllyms.github.io">Sam Williams</a>. </p>
        </div>
    );
}