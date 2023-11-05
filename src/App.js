import React from 'react';
import Homepage from './Homepage'; 
import Congress from './Congress';
import Parliament from './Parliament';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; //link?

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
}

export default App;