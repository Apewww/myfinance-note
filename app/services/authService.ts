import API from "./api";

export const login = async (email: string, password: string) => {
  const response = await API.post("/login", { email, password });
  return response.data;
};

export const register = async (email: string, password: string) => {
  const response = await API.post("/register", { email, password });
  return response.data;
};
