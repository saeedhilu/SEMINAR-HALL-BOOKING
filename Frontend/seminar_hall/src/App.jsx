import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login/Loging';
import Signup from './Component/Signup/Signup';
import SeatMap from './Component/SeatMap';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/seats" element={<SeatMap />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
