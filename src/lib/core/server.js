

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export async function serverFetch(path) {
  const res = await fetch(`${serverUrl}${path}`);
  // handle 401 , 404 , 5000
  return res.json();
}




export async function serverMutation(path,data,method = 'POST') {
  const res = await fetch(`${serverUrl}${path}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  // handle 401 , 404 , 5000
  return res.json();
}
