import axios from "axios";
import {
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT_SUCCESS,
} from "./ActionType";

export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  const baseUrl = "http://localhost:8080";

  try {
    const responce = await axios.post(`${baseUrl}/auth/signup`, userData);
    const user = responce.data;
    console.log(user);

    dispatch({ type: REGISTER_SUCCESS, payload: user.jwt });

    localStorage.setItem("jwt", user.jwt);
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
    console.log(error);
  }
};

export const login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  const baseUrl = "http://localhost:8080";

  try {
    const responce = await axios.post(`${baseUrl}/auth/login`, userData.data);
    const user = responce.data;
    console.log(user);

    dispatch({ type: LOGIN_SUCCESS, payload: user.jwt });

    localStorage.setItem("jwt", user.jwt);
    userData.navigate("/");
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
    console.log(error);
  }
};

export const getUser = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  const baseUrl = "http://localhost:8080";

  try {
    const responce = await axios.get(`${baseUrl}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const user = responce.data;
    console.log(user);

    dispatch({ type: GET_USER_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error.message });
    console.log(error);
  }
};
export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOG_OUT_SUCCESS });
};
