import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Component/Signup/Signup';
import Login from './Component/Login/Loging';
import SeatMap from './Component/SeatMap';

function App() {
  const [isSignedUp, setIsSignedUp] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup onSuccess={() => setIsSignedUp(true)} />} />
        <Route path="/login" element={!isSignedUp ? <Login onSuccess={() => setIsSignedUp(true)} /> : <Navigate to="/seatmap" />} />
        <Route path="/seatmap" element={isSignedUp ? <SeatMap /> : <Navigate to="/signup" />} />
      </Routes>
    </Router>
  )
}

export default App;
