import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_AMBIENT === "DEVELOPMENT"
      ? process.env.REACT_APP_API_URL_DEVELOPMENT
      : process.env.REACT_APP_API_URL_PRODUCTION,
});
