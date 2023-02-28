const BASE_API = `http://localhost:8080/api`;

export const getAllPrints = async () => {
  try {
    const response = await fetch(`${BASE_API}/prints`);
    const results = await response.json();
    return results.prints;
  } catch (error) {
    console.error(error);
  }
};
