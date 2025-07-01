export async function sendMessage(message) {
  const query = encodeURIComponent(message);
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/ask?q=${query}`, {
    method: 'GET'
  });

  if (response.ok) {
    return response.text();
  } else {
    throw new Error('Failed to send message');
  }
}
