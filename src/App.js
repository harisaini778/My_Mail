import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import MailBox from './Components/MailBox';
// import Header from './Components/Header';
// import Inbox from './Components/Inbox';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Mailbox" element={<MailBox />} />
        {/* <Route path="/Inbox" element={<Inbox />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
