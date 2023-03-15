import React from 'react';

const TableHeader = ({ handleSort }) => (
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
);

export default TableHeader;
