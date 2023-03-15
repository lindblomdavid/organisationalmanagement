import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import './UserEdit.css';

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [ansvarsomrade, setAnsvarsomrade] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`API_URL/user/${id}`);
        setUser(response.data);
        setAnsvarsomrade(response.data.ansvarsomrade);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (event) => {
    setAnsvarsomrade(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`API_URL/user/${id}`, { ansvarsomrade });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-edit">
      <Header />
      <h2>Edit {user.name}'s Ansvarsområde</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="ansvarsomrade">Ansvarsområde:</label>
        <input
          type="text"
          id="ansvarsomrade"
          name="ansvarsomrade"
          value={ansvarsomrade}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserEdit;
