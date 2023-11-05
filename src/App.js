import React from 'react';
import Homepage from './Homepage'; 
import Congress from './Congress';
import Parliament from './Parliament';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; //imports stuff from the react-router-dom library, browser router nicknamed router, route is the url, routes is conatiner

function App() 
{
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} /> 
          <Route path="/congress" element={<Congress />} />
          <Route path="/parliament" element={<Parliament />} />
        </Routes>
      </Router>
    </div>
  );
  //path / is root url
  //path /congress or path /parliament is url to congress page/parliament page
}

export default App;