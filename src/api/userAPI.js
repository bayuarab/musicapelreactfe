import axios from "axios";

const localAuth = JSON.parse(localStorage.getItem("userAuth"));
const token = localAuth?.token;

export default axios.create({
  baseURL: "https://localhost:7132/api/User",
  headers: { Authorization: "Bearer " + token },
});
