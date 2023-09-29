import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import MailBox from './Components/MailBox';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define a route for the root location */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/Mailbox" element={<MailBox />} />
      </Routes>
    </Router>
  );
};

export default App;
