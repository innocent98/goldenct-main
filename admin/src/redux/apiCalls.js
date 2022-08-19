import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux";
import { userRequest } from "../requestMethod";
// import { toast } from "react-toastify";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await userRequest.post("/auth/login/admin", user);
    dispatch(loginSuccess(res.data));
    window.location.reload();
  } catch (err) {
    dispatch(loginFailure());
    return alert(err.response.data);
  }
};

export const userLogout = async (dispatch) => {
  dispatch(logout());
};
