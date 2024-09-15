import { fetchClient } from "./fetchClient";

const fetchDentistsAll = async () => {
  const doctors = await fetchClient("/users/dentistsAll");

  return doctors;
};

export { fetchDentistsAll };
