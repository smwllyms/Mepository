import './App.css';

import React, { useReducer } from "react"

import Header from "./components/Header/Header"
import About from "./components/Content/About"
import CalendarView from "./components/Content/CalendarView/CalendarView"
import Loading from "./components/Loading/Loading"

// User Data
export const UserDataContext = React.createContext();

// Function that provides boilerplate user data
function getUserData()
{
  return {
    name: "Sam",
    data: {
      day: {
        "6/12/2024": [
          {
            timestamp: (new Date()).toISOString(),
            text: "I feel quite weird right now"
          },
          {
            timestamp: (new Date()).toISOString(),
            text: "Nevermind"
          }
        ]
      },
      week: {

      },
      month: {

      }
    }
  }
}


function App() {

  // Current page
  const [currentViewId, setCurrentViewId] = React.useState(0);
  // State for loading
  const [isLoading, setIsLoading] = React.useState(false);
  // User data (used in context)
  const [userData, setUserData] = React.useState(getUserData());

  // Navigation from Header
  function nav(pageName)
  {

    let pageId = 0;

    switch (pageName)
    {
      case "CalendarView":
        pageId = 1;
        break;        
      default: break;
    }

    setCurrentViewId(pageId)
  }

  // Safe function for modifying data
  const safeSetUserData = React.useCallback((dateType, data) =>
  {

    // Ensure non empty message
    if (data.message === "" || data.message.replace(/\s/g,'').length === 0) return;

    const date = data.date.toLocaleDateString();
    const payload = {
      timestamp: data.date.toISOString(),
      text: data.message
    };

    // 0 - day, 1 - week, 2 - month
    switch (dateType)
    {
      case 1:
        userData.data.week[date] ||= [];
        userData.data.week[date].push(payload);
        break;
      case 2:
        userData.data.month[date] ||= [];
        userData.data.month[date].push(payload);
        break;
      default:
        userData.data.day[date] ||= [];
        userData.data.day[date].push(payload);
        break;
    }

    setUserData({...userData});

  }, [userData, setUserData]);

  // Helper for identifying pages (id is index of array)
  const getPage = React.useCallback((id) => {
    switch (id)
    {
      case 1:
          return (
            <CalendarView 
              safeSetUserData={safeSetUserData}/>
          )
      default:
          return (
            <About />
          )
    }
  }, []);

  return (
    <UserDataContext.Provider value={userData}>
      <div className="App">
        <Header 
          nav={nav}/>
        <div id="body-wrapper">
          { 
            isLoading ? 
            <Loading /> : 
            getPage(currentViewId) 
          }
        </div>
      </div>
    </UserDataContext.Provider>
  );
}

export default App;
