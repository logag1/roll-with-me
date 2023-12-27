import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Main from './components/Main';
import Paper from './components/Paper';
import Register from './components/Register';
import Login from './components/Login';
import Detail from './components/Detail';
import Write from './components/Write';
import Setting from './components/Setting';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/paper" element={<Paper />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/write" element={<Write />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </Router>
    );
  }
}

export default App;