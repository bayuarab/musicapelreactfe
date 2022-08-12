import api from "../api/userAPI";

export function getClaimedCourses(userId) {
  const fetchApi = async () => {
    try {
      const response = await api.get(`/Courses/${userId}`);
      console.log(response.data);
      return response.data;
    } catch (err) {
      !err.response
        ? console.log(`Error: ${err.message}`)
        : console.log(err.response.data);
      if (err.response.data === "Not Found") console.log(err.response.status);
      console.log(err.response.headers);
      return [];
    }
  };
  const courses = fetchApi();
  console.log("courses", courses);
  return courses?.map((items) => items.courseId);
}
