import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Page from './Page'

function App() {
    return (
      <Router>
        
          <Route exact path="/" component={Page} />
          <Route path="/:syear(\d{4})/:smonth(\d+)/:sday(\d+)" component={Page} />
        
      </Router>
    );
  }
  
  function PageA ({match}){
      console.log(match)
    return (
        <div>
          <h3> {match.params.year}</h3>
        </div>
      );
  }
  
  export default App;