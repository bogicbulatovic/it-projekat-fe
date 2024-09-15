// application/json	JSON data
// application/x-www-form-urlencoded	URL-encoded form data
// multipart/form-data	Form data, including files (handled automatically)
// text/plain	Plain text
// application/octet-stream	Binary data (files, blobs, etc.)
// application/xml / text/xml	XML data
// text/html	HTML content
// application/pdf

const fetchClient = async (path, options = {}) => {
  const { method = "GET", body, contentType } = options;

  const headers = {};

  const userToken = window.localStorage.getItem("user-token");

  if (userToken) {
    headers.authorization = `Bearer ${userToken}`;
  }

  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  const res = await fetch(`http://localhost:3000${path}`, {
    headers,
    method,
    body,
  });

  if (!res.ok) {
    console.log(res.statusText);
    throw new Error(res.statusText);
  }

  return await res.json();
};

export { fetchClient };
