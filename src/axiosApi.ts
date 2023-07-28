import axios from "axios";

const axiosApi = axios.create({
  baseURL:
    "https://js-course18-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default axiosApi;
