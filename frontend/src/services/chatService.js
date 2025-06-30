export async function sendMessage(message) {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message)
  });
  if (response.ok) {
    return response.text();
  } else {
    throw new Error('Failed to send message');
  }
} 