

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export async function serverFetch(path) {
  try {
    const res = await fetch(`${serverUrl}${path}`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}




export async function serverMutation(path, data, method = 'POST') {
  try {
    const res = await fetch(`${serverUrl}${path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
