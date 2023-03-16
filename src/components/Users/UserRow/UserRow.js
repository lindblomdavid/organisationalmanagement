import React from 'react';

const UserRow = ({ user, openModal, openUpdateModal }) => (
  <tr key={user.id}>
    <td>{user.id}</td>
    <td>{user.kvartersvard_properties.Namn}</td>
    <td>{user.kvartersvard_properties.Referensnummer}</td>
    <td>{user.kvartersvard_properties.Telefonnummer}</td>
    <td>{user.kvartersvard_properties.Epost}</td>
    <td>
      {user.ansvarsomrade_properties.Ansvarsomrade}
      <button style={{ marginLeft: '8px' }} onClick={() => openModal(user)}>
        Ändra
      </button>
    </td>
    <td>{user.kostnadsstalle_properties.Omradesnamn}</td>
    <td>{user.kostnadsstalle_properties.Kostnadsstalle}</td>
    <td>
      <button onClick={() => openUpdateModal(user)}>Ändra</button>
    </td>
  </tr>
);

export default UserRow;
