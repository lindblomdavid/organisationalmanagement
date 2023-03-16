const API_URI = process.env.REACT_APP_API_URI;
const API_KEY = process.env.REACT_APP_API_KEY;

export async function getUsers() {
  const url = `${API_URI}getKvv`;

  try {
    const response = await fetch(url, {
      headers: {
        'Ocp-Apim-Subscription-Key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await response.json();
    return data.kvartersvardar;
  } catch (error) {
    console.error('Error in getUsers function:', error);
    return [];
  }
}

export async function deleteAnsvarsomrade(referensnummer) {
  const url = `${API_URI}deleteAnsvarForKvv`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Ocp-Apim-Subscription-Key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ referensnummer }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete ansvarsområde');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in deleteAnsvarsomrade function:', error);
    throw error;
  }
}

export async function updateAnsvarsomrade(referensnummer, ansvarsomrade) {
  const url = `${API_URI}createAnsvarForKvv`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ referensnummer, ansvarsomrade }),
    });

    if (!response.ok) {
      throw new Error('Failed to update ansvarsområde');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in updateAnsvarsomrade function:', error);
    throw error;
  }
}

export async function updateKvartersvard(referensnummer, properties) {
  const url = `${API_URI}updatekvv`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Ocp-Apim-Subscription-Key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ referensnummer, properties }),
    });

    if (!response.ok) {
      throw new Error('Failed to update Kvartersvärd');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in updateKvartersvard function:', error);
    throw error;
  }
}
