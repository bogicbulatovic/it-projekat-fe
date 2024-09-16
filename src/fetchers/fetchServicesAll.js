import { fetchClient } from "./fetchClient";

const fetchServicesAll = async () => {
  const data = await fetchClient("/services");

  return data;
};

export { fetchServicesAll };
