import axios from "axios";
const baseUrl = "/api/users";

const getAllUsers = () => {
  return axios.get(baseUrl).then(response => response.data);
};

export default { getAllUsers };