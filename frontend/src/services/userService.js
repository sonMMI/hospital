import axios from "../axios";

const userService = {
  handleLogin(userEmail, userPassword) {
    return axios.post("/api/login", {
      email: userEmail,
      password: userPassword,
    });
  },
};

export default userService;
