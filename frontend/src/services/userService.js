import axios from "../axios";

const userService = {
  handleLogin(userEmail, userPassword) {
    return axios.post("/api/login", {
      email: userEmail,
      password: userPassword,
    });
  },

  handleRegister(data) {
    return axios.post("/api/register", {
      data: data,
    });
  },
};

export default userService;
