import axios from "axios";

const instance = axios.create({
    // baseURL: "https://api.themoviedb.org/3",
    baseURL: "https://fakestoreapi.com",
  });
  export default instance
  