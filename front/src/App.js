import './App.css';

import React from "react"

import Header from "./components/Header/Header"
import About from "./components/Content/About"
import CalendarView from "./components/Content/CalendarView"
import Loading from "./components/Loading/Loading"

function App() {

  // Current page
  const [currentViewId, setCurrentViewId] = React.useState(0);
  // State for loading
  const [isLoading, setIsLoading] = React.useState(false);

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

  // Helper for identifying pages (id is index of array)
  const getPage = React.useCallback((id) => {
    switch (id)
    {
      case 1:
          return (
            <CalendarView />
          )
      default:
          return (
            <About />
          )
    }
  }, []);

  return (
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
  );
}

export default App;
