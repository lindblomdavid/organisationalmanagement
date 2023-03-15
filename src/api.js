export async function getUsers() {
  const url =
    'https://mim-shared-apim-apim01.azure-api.net/mim-test-organisation-api/getKvv';
  const subscriptionKey = 'c58eb0168bd9449c991df5a20ba8feff';

  try {
    const response = await fetch(url, {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await response.json();
    console.log('Data received from API:', data); // Add this console log
    return data.kvartersvardar;
  } catch (error) {
    console.error('Error in getUsers function:', error); // Add this console log
    return [];
  }
}
