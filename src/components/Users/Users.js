import React, { useState, useEffect } from 'react';
import './Users.css';
import { getUsers } from '../../api';
import EditAnsvarsomradeModal from '../EditAnsvarsomradeModal/EditAnsvarsomradeModal';
import TableHeader from './TableHeader/TableHeader';
import EditUserModal from '../EditUserModal/EditUserModal';
import UserRow from './UserRow/UserRow';

const Users = () => {
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortKey, setSortKey] = useState('Namn');
  const [sortDirection, setSortDirection] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [filterText, setFilterText] = useState('');

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

  const filterUsers = (users) => {
    return users.filter((user) => {
      const kvartersvardProperties = Object.values(
        user.kvartersvard_properties
      );
      const ansvarsomradeProperties = Object.values(
        user.ansvarsomrade_properties
      );
      const kostnadsstalleProperties = Object.values(
        user.kostnadsstalle_properties
      );
      const allProperties = [
        user.id,
        ...kvartersvardProperties,
        ...ansvarsomradeProperties,
        ...kostnadsstalleProperties,
      ];

      return allProperties.some((property) =>
        property.toString().toLowerCase().includes(filterText.toLowerCase())
      );
    });
  };

  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedUser(null);
    setIsUpdateModalOpen(false);
  };

  return (
    <div className="users">
      <h2>Kvartersvärdar</h2>
      <input
        type="text"
        placeholder="Sök"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        style={{
          marginBottom: '16px',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <table>
        <TableHeader handleSort={handleSort} />
        <tbody>
          {filterUsers(sortedUsers).map((user) => (
            <UserRow
              key={user.id}
              user={user}
              openModal={openModal}
              openUpdateModal={openUpdateModal} // Pass the openUpdateModal function
            />
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
      {isUpdateModalOpen && (
        <EditUserModal
          selectedUser={selectedUser}
          closeModal={closeUpdateModal}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Users;
