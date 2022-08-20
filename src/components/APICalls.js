import Axios from "axios";

export const APIRequest = Axios.create({
  baseURL: "https://localhost:7075/",
});

export default function getAllProducts() {
  APIRequest({ method: "GET", url: "admin/api/Course", params: { search: "" } })
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((err) => {
      console.log(err.response.data);
    });
}

const postData = () => {
  const postDataa = {
    name: "INI DATA AXIOSSS",
    description: "DATA BARUUUUUU",
    brand_id: 1,
    price: 12000,
    sold: 12,
    rating: 3,
    image: "test",
    saveType: "add",
  };

  APIRequest({
    method: "POST",
    url: "api/Product/post-product",
    data: postDataa,
  })
    .then((res) => {
      if (res.status === 200) {
        console.log(res.status);
      }
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
