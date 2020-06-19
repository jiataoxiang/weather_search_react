import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherSearch from "./component/weather.search";
import LocationSearch from "./component/location.search";
import Navbar from "./component/navbar.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br/>
      <Route path="/" exact component={WeatherSearch} />
      <Route path="/weather" component={WeatherSearch} />
      <Route path="/location" component={LocationSearch} />
    </Router>
  );
}

export default App;
