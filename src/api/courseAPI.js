import axios from "axios";

export default axios.create({
	baseURL: "https://localhost:7132/api/Course",
});
