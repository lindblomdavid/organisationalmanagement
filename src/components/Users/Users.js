import React, { useState, useEffect } from 'react';
import './Users.css';
import { getUsers } from '../../api';
import EditAnsvarsomradeModal from '../EditAnsvarsomradeModal/EditAnsvarsomradeModal';

const Users = () => {
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortKey, setSortKey] = useState('Namn');
  const [sortDirection, setSortDirection] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      const users = await getUsers();
      setFetchedUsers(users);
    }
    fetchData();
  }, []);

  useEffect(() => {
    function sortUsers() {
      const users = [...fetchedUsers].sort((a, b) => {
        const valueA = a.kvartersvard_properties[sortKey];
        const valueB = b.kvartersvard_properties[sortKey];

        if (valueA < valueB) {
          return -1 * sortDirection;
        }
        if (valueA > valueB) {
          return 1 * sortDirection;
        }
        return 0;
      });

      setSortedUsers(users);
    }

    sortUsers();
  }, [sortKey, sortDirection, fetchedUsers]);

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortDirection(sortDirection * -1);
    } else {
      setSortKey(key);
      setSortDirection(1);
    }
  };

  const handleUpdate = async () => {
    // Logic to refresh the users list after updating the ansvarsområde
    // You can either refetch the users list or update the state directly
    const users = await getUsers();
    setFetchedUsers(users);
  };

  return (
    <div className="users">
      <h2>Kvartersvärdar</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('ID')}>ID</th>
            <th onClick={() => handleSort('Namn')}>Namn</th>
            <th onClick={() => handleSort('Referensnummer')}>Referensnummer</th>
            <th onClick={() => handleSort('Telefonnummer')}>Telefon</th>
            <th onClick={() => handleSort('Ansvarsområde')}>Ansvarsområde</th>
            <th onClick={() => handleSort('Områdesnamn')}>Områdesnamn</th>
            <th onClick={() => handleSort('Kostnadsställe')}>Kostnadsställe</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.kvartersvard_properties.Namn}</td>
              <td>{user.kvartersvard_properties.Referensnummer}</td>
              <td>{user.kvartersvard_properties.Telefonnummer}</td>
              <td>
                {user.ansvarsomrade_properties.Ansvarsomrade}
                <button
                  style={{ marginLeft: '8px' }}
                  onClick={() => openModal(user)}
                >
                  Ändra
                </button>
              </td>
              <td>{user.kostnadsstalle_properties.Omradesnamn}</td>
              <td>{user.kostnadsstalle_properties.Kostnadsstalle}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <EditAnsvarsomradeModal
          selectedUser={selectedUser}
          closeModal={closeModal}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Users;
