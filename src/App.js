import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Home from './pages/Home';
import JobMonitor from './pages/JobMonitor';
import Layout from './components/Layout';
import JobSummary from './pages/JobSummary';
import './App.css';

const App = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Router>
      <Routes>
        {!token && <Route path="*" element={<Login/>} />}
        {token && (
          <Route element={<Layout/>}>
            <Route path="/" element={<Home />} />
            <Route path="/job-monitor" element={<JobMonitor />} />
            <Route path="/job-summary" element={<JobSummary />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
