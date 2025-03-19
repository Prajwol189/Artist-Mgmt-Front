import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/users";

export const signUp = async (userData: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
  dob?: string;
  gender: "m" | "f" | "o";
  address?: string;
  role_type: "super_admin" | "artist_manager" | "artist";
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup/`, userData);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};
// Login API
export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/`, credentials);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};
