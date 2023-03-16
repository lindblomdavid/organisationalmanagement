import React, { useState } from 'react';
import './EditUserModal.css';
import { updateKvartersvard } from '../../api';

const EditUserModal = ({ selectedUser, closeModal, onUpdate }) => {
  const [name, setName] = useState(selectedUser.kvartersvard_properties.Namn);
  const [email, setEmail] = useState(
    selectedUser.kvartersvard_properties.Epost
  );
  const [telefonnummer, setTelefonnummer] = useState(
    selectedUser.kvartersvard_properties.Telefonnummer
  );
  const [referensnummer, setReferensnummer] = useState(
    selectedUser.kvartersvard_properties.Referensnummer
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const properties = {
        Namn: name,
        Epost: email,
        Telefonnummer: telefonnummer,
        Referensnummer: referensnummer,
      };
      await updateKvartersvard(
        selectedUser.kvartersvard_properties.Referensnummer,
        properties
      );

      await onUpdate();
      setIsSubmitting(false);

      closeModal();
    } catch (error) {
      setIsSubmitting(false);
      console.error('Error in handleSubmit:', error);
      setErrorMessage(
        'An error occurred while updating the Kvartersvärd. Please try again.'
      );
    }
  };

  return (
    <div className="edit-user-modal">
      <div className="modal-content">
        <h3>Uppdatera Kvartersvärd: {name}</h3>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Namn:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="email">Epost:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            //required
          />
          <label htmlFor="telefonnummer">Telefonnummer:</label>
          <input
            type="text"
            id="telefonnummer"
            value={telefonnummer}
            onChange={(e) => setTelefonnummer(e.target.value)}
            required
          />
          <label htmlFor="referensnummer">Referensnummer:</label>
          <input
            type="text"
            id="referensnummer"
            value={referensnummer}
            onChange={(e) => setReferensnummer(e.target.value)}
            required
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Uppdatera'}
          </button>
        </form>
        <button onClick={closeModal} disabled={isSubmitting}>
          Stäng
        </button>
      </div>
    </div>
  );
};

export default EditUserModal;
