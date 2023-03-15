import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserEdit from './components/UserEdit/UserEdit';
import Users from './components/Users/Users';
import Settings from './components/Settings/Settings';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header/Header';

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
          <Route path="/" element={<Dashboard />} index />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user/:id" element={<UserEdit />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
