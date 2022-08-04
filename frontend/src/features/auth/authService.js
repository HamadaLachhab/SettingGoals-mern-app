// deal with http request and sending data back and seting any data in Local Storage
import axios from "axios"; // axios is like postman

const API_URL = "/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData); // userData is register info (email front =>Back)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData); // userData is login info (email front =>Back)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};
export default authService;
