import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import MailBox from './Components/MailBox';
// import Header from './Components/Header';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Mailbox" element={<MailBox />} />
      </Routes>
    </Router>
  );
};

export default App;
