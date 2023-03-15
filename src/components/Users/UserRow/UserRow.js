import React from 'react';

const UserRow = ({ user, openModal }) => (
  <tr>
    <td>{user.id}</td>
    <td>{user.kvartersvard_properties.Namn}</td>
    <td>{user.kvartersvard_properties.Referensnummer}</td>
    <td>{user.kvartersvard_properties.Telefonnummer}</td>
    <td>
      {user.ansvarsomrade_properties.Ansvarsomrade}
      <button style={{ marginLeft: '8px' }} onClick={() => openModal(user)}>
        Ändra
      </button>
    </td>
    <td>{user.kostnadsstalle_properties.Omradesnamn}</td>
    <td>{user.kostnadsstalle_properties.Kostnadsstalle}</td>
  </tr>
);

export default UserRow;
