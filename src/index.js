import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Log from "./pages/log";
import Master from "./pages/master";
import Spde from "./pages/spde";

ReactDOM.render(
  <React.StrictMode>
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/change_log" element={<Log />} />
        <Route path="/master" element={<Master />} />
        <Route path="/spde" element={<Spde />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();