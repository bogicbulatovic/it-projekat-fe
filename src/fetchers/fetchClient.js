const fetchClient = async (path) => {
  const res = await fetch(`http://localhost:3000${path}`, {
    headers: {
      authorization: `Bearer ${window.localStorage.getItem("user-token")}`,
    },
  });

  if (!res.ok) {
    console.log(res.statusText);
    throw new Error(res.statusText);
  }

  return await res.json();
};

export { fetchClient };
