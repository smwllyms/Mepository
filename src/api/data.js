// Generate new "profile"
function generate()
{
    const t = new Date();

    const newProfile = JSON.stringify({
        version: "0.1.0",
        users: [
            {
                name: "default",
                activated: true,
                dateCreated: t,
                dateModified: t,
                calendars: [
                    { 
                        name: "default",
                        data: {
                            day: {},
                            week: {},
                            month: {}
                        },
                        dateCreated: t,
                        dateModified: t
                    }
                ]
            }
        ]
    })

    localStorage.setItem("mepository", newProfile);

    return newProfile;
}

// Get data from local Storage
function _getProfileData()
{
    return JSON.parse(localStorage.getItem("mepository") || generate());
}

function _setCalendarData(calendarData, name, calendar)
{
    const profile = _getProfileData();
    const user = profile.users.find(d=>d.name===name);

    // When we modified should also be updated
    const t = new Date();
    user.dateModified = t;
    calendarData.dateModified = t;

    // Update calendars
    const calendarsSans = user.calendars.filter(c=>c.name !== calendar);
    user.calendars = [...calendarsSans, calendarData];

    localStorage.setItem("mepository", JSON.stringify(profile));
}

export default function ()
{

    function getCalendarData(name, calendar)
    {

        name ||= "default";
        calendar ||= "default";

        const data = _getProfileData();

        return data.users.find(d=>d.name===name).calendars.find(c=>c.name===calendar);
    }

    function setCalendarData(calendarData, name, calendar)
    {
        name ||= "default";
        calendar ||= "default";

        _setCalendarData(calendarData, name, calendar);
    }

    return {
        getCalendarData: getCalendarData,
        setCalendarData: setCalendarData
    }
}

// DEMO Calendar Data
/*
{
    name: "Sam's Calendar",
    data: {
      day: {
        "6/26/2024": [ // Note the key is an instance of Date.toLocaleDateString()
          {
            tsID: (new Date()).toISOString(), // Note the timestamps are an instance of Date.toISOString()
            tsEntry: (new Date()).toISOString(),
            text: "This is a demo day entry"
          },
          {
            tsID: (new Date()).toISOString(),
            tsEntry: (new Date()).toISOString(),
            text: "And Another"
          }
        ],
        "6/27/2024": [
          {
            tsID: (new Date()).toISOString(),
            tsEntry: (new Date()).toISOString(),
            text: "Here's one that's the next day!"
          }
        ]
      },
      week: {
        "6/23/2024": [
          {
            tsID: (new Date()).toISOString(),
            tsEntry: (new Date()).toISOString(),
            text: "This one is a week entry! Note its date is the prior Sunday"
          }
        ]
      },
      month: {
        "6/1/2024": [
          {
            tsID: (new Date()).toISOString(),
            tsEntry: (new Date()).toISOString(),
            text: "This one is a month entry! Note its date is the first of the month"
          }
        ]
      }
    }
  }
*/