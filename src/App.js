import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Congress from './Congress';
import Parliament from './Parliament';
import NotFound from './NotFound'; //Import NotFound component

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/API-app" element={<Homepage />} />
          <Route path="/API-app/congress" element={<Congress />} />
          <Route path="/API-app/parliament" element={<Parliament />} />
          <Route path="*" element={<NotFound/>} /> {}
        </Routes>
      </Router>
    </div>
  );
}

export default App;