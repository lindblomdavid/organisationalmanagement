import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Users from './components/Users/Users';
import Header from './components/Header/Header';
import About from './components/About/About';
import Properties from './components/Properties/Properties';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<About />} index />
          <Route path="/users" element={<Users />} />
          <Route path="/properties" element={<Properties />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
