import axios from "axios"

// const BASE_URL = "http://localhost:6000/api/";

// const BASE_URL = "https://goldenct-api.herokuapp.com/api/";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;
const FORGOTTOKEN = currentUser?.forgotToken;

export const userRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { token: `Bearer ${TOKEN}` },
});

export const forgotRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { token: `Bearer ${FORGOTTOKEN}` },
});
