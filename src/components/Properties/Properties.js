import React from 'react';
import './Properties.css';
import PropertiesTableHeader from './PropertiesHeader/PropertiesHeader';
import PropertiesRow from './PropertiesRow/PropertiesRow';

const Properties = () => {
  return (
    <div className="properties">
      <h2>Properties</h2>
      <table>
        <PropertiesTableHeader />
        <tbody>
          <PropertiesRow />
        </tbody>
      </table>
    </div>
  );
};

export default Properties;
