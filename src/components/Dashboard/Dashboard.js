import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import Users from '../Users/Users';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('API_URL');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="dashboard">
      <Users users={users} />
    </div>
  );
};

export default Dashboard;
