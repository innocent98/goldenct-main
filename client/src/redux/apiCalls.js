import {
  forgotLoginFailure,
  forgotLoginStart,
  forgotLoginSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  updateFailure,
  updateStart,
  updateSuccess,
} from "./userRedux";
import { forgotRequest, userRequest } from "../requestMethod";
import { toast } from 'react-toastify';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await userRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    window.location.reload();
  } catch (err) {
    dispatch(loginFailure());
    return toast.error(err.response.data);
  }
};

export const update = async (dispatch, user) => {
  dispatch(updateStart());
  try {
    const res = await userRequest.put("/user/edit/user", user);
    dispatch(updateSuccess(res.data));
    // window.location.reload();
    return toast.success("Data updated successfully, kindly referesh.");
  } catch (err) {
    dispatch(updateFailure());
    return toast.error(err.response.data);
  }
};

export const loginForgot = async (dispatch, user) => {
  dispatch(forgotLoginStart());
  try {
    const res = await forgotRequest.post("/auth/forgot-password-request", user);
    dispatch(forgotLoginSuccess(res.data));
    // window.location.reload();
    return alert("Password reset link has been sent to your email.")
  } catch (err) {
    dispatch(forgotLoginFailure());
    return toast.error(err.response.data);
  }
};

export const userLogout = async (dispatch) => {
  dispatch(logout());
};
