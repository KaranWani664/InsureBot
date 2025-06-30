export async function sendMessage(message) {
  const body = typeof message === 'string' ? JSON.stringify({ message }) : JSON.stringify(message);
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  });
  if (response.ok) {
    return response.text();
  } else {
    throw new Error('Failed to send message');
  }
} 