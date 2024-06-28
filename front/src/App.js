import './App.css';

import React, { useReducer } from "react"

import Header from "./components/Header/Header"
import About from "./components/Content/About"
import CalendarView from "./components/Content/CalendarView/CalendarView"
import Loading from "./components/Loading/Loading"

import DataAPI from "./api/data.js"
import data from './api/data.js';

// User Data
export const UserDataContext = React.createContext();

// Function that provides boilerplate user data
// - tsID : the time stamp associated with given day, week, or month
// - tsEntry: the exact timestamp of the entry

// Fetch the API
async function fetchDataAPI()
{
  await new Promise(r=>setTimeout(r, 100));
  return DataAPI();
}

function App() {

  // Is the app initialized
  const appIntitialized = React.useRef(false);
  // Data API Initialized
  const dataAPIInitialized = React.useRef(false);
  // Data API instance
  const [dataAPI, setDataAPI] = React.useState()
  // Current page
  const [currentViewId, setCurrentViewId] = React.useState(0);
  // State for loading
  const [isLoading, setIsLoading] = React.useState(false);
  // User data (used in context)
  const [userData, setUserData] = React.useState();

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

    const date = data.tsID.toLocaleDateString();
    const payload = {
      tsID: data.tsID.toISOString(),
      tsEntry: data.tsEntry.toISOString(),
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
  }, [userData]);


    // Update data here!
    React.useEffect(()=>{
      // console.log(userData)
      if (dataAPIInitialized.current === true)
      {
        if (!appIntitialized.current)
        {
          appIntitialized.current = true;
          // Now our app is officially ready to go
        }
        else
        {
          dataAPI.setCalendarData(userData)
        }
      }
    }, [dataAPI, userData, dataAPIInitialized, appIntitialized])
    

  // Initial effect (fetch data api)
  React.useEffect(()=>{

    async function f()
    {
      // Fetch the dataAPI
      const api = await fetchDataAPI();

      setDataAPI(api);
      setUserData(api.getCalendarData());
      dataAPIInitialized.current = true;

      console.log("Initialized")
    }
    f();
  }, [setDataAPI, setUserData, dataAPIInitialized])

  return (
    <UserDataContext.Provider value={userData}>
      <div className="App">
        <Header 
          nav={nav}
          currentPageId={currentViewId}/>
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
