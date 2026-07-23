import api from "../api/api";

export const analyzeBug = async (title, description) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/ai/analyze",
    {
      title,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.analysis;
};