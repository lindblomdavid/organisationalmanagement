import React, { useState } from 'react';
import './EditAnsvarsomradeModal.css';
import { deleteAnsvarsomrade, updateAnsvarsomrade } from '../../api';

const EditAnsvarsomradeModal = ({ selectedUser, closeModal, onUpdate }) => {
  const [ansvarsomrade, setAnsvarsomrade] = useState(
    selectedUser?.ansvarsomrade_properties?.Ansvarsomrade || ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ansvarsomrade.trim()) {
      setErrorMessage('Ansvarsområde cannot be empty.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Call the deleteAnsvarsomrade API
      const deleteResponse = await deleteAnsvarsomrade(
        selectedUser.kvartersvard_properties.Referensnummer
      );
      console.log('Delete response:', deleteResponse);

      // Call the updateAnsvarsomrade API
      const updateResponse = await updateAnsvarsomrade(
        selectedUser.kvartersvard_properties.Referensnummer,
        ansvarsomrade
      );
      console.log('Update response:', updateResponse);

      // After successful API calls, trigger the onUpdate callback to update the users list
      await onUpdate();
      setIsSubmitting(false);

      // Close the modal
      closeModal();
    } catch (error) {
      setIsSubmitting(false);
      console.error('Error in handleSubmit:', error);
      setErrorMessage(
        'An error occurred while updating the ansvarsområde. Please try again.'
      );
    }
  };

  return (
    <div className="edit-ansvarsomrade-modal">
      <div className="modal-content">
        <h3>
          Edit Ansvarsområde for {selectedUser.kvartersvard_properties.Namn}
        </h3>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="ansvarsomrade">Ansvarsområde:</label>
          <input
            type="text"
            id="ansvarsomrade"
            value={ansvarsomrade}
            onChange={(e) => setAnsvarsomrade(e.target.value)}
            required
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update'}
          </button>
        </form>
        <button onClick={closeModal} disabled={isSubmitting}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EditAnsvarsomradeModal;
