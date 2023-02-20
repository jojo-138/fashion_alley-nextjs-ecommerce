export default async function fetchAPI(route, method, body) {
  let res;

  if (method === 'GET') {
    res = await fetch(route);
  } else {
    res = await fetch(route, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  const data = await res.json();

  return data;
}
