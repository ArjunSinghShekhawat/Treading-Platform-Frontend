import axios from "axios";
import {
  ADD_PAYMENTDETAILS_FAILURE,
  ADD_PAYMENTDETAILS_REQUEST,
  ADD_PAYMENTDETAILS_SUCCESS,
  GET_PAYMENTDETAILS_FAILURE,
  GET_PAYMENTDETAILS_REQUEST,
  GET_PAYMENTDETAILS_SUCCESS,
  GET_WITHDRAWAL_HISTORY_FAILURE,
  GET_WITHDRAWAL_HISTORY_REQUEST,
  GET_WITHDRAWAL_HISTORY_SUCCESS,
  GET_WITHDRAWAL_REQUEST_FAILURE,
  GET_WITHDRAWAL_REQUEST_REQUEST,
  GET_WITHDRAWAL_REQUEST_SUCCESS,
  WITHDRAWAL_FAILURE,
  WITHDRAWAL_PROCESS_FAILURE,
  WITHDRAWAL_PROCESS_REQUEST,
  WITHDRAWAL_PROCESS_SUCCESS,
  WITHDRAWAL_SUCCESS,
} from "./ActionType";

export const withdrawalRequest =
  ({ amount, jwt }) =>
  async (dispatch) => {
    dispatch({ type: WITHDRAWAL_SUCCESS });

    try {
      const responce = await axios.post(
        `http://localhost:8080/api/withdrawal/${amount}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: WITHDRAWAL_SUCCESS,
        payload: responce.data,
      });
      console.log("withdrawal ------", responce.data);
    } catch (error) {
      dispatch({
        type: WITHDRAWAL_FAILURE,
        payload: error.message,
      });
    }
  };

export const proceedWithdrawal =
  ({ id, jwt, accept }) =>
  async (dispatch) => {
    dispatch({ type: WITHDRAWAL_PROCESS_REQUEST });

    try {
      const responce = await axios.patch(
        `http://localhost:8080/api/admin/withdrawal/${id}/proceed/${accept}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: WITHDRAWAL_PROCESS_SUCCESS,
        payload: responce.data,
      });
      console.log("procced withdrawal ------", responce.data);
    } catch (error) {
      console.log("error ", error);
      dispatch({
        type: WITHDRAWAL_PROCESS_FAILURE,
        payload: error.message,
      });
    }
  };

export const getWithdrawalHistory =
  ({ jwt }) =>
  async (dispatch) => {
    dispatch({ type: GET_WITHDRAWAL_HISTORY_REQUEST });

    try {
      const responce = await axios.get(`http://localhost:8080/api/withdrawal`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatch({
        type: GET_WITHDRAWAL_HISTORY_SUCCESS,
        payload: responce.data,
      });
      console.log("get withdrawal history ------", responce.data);
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: GET_WITHDRAWAL_HISTORY_FAILURE,
        payload: error.message,
      });
    }
  };

export const getAllWithdrawalHistory =
  ({ jwt }) =>
  async (dispatch) => {
    dispatch({ type: GET_WITHDRAWAL_REQUEST_REQUEST });

    try {
      const responce = await axios.get(
        `http://localhost:8080/api/admin/withdrawal`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("get withdrawal request ------", responce.data);

      dispatch({
        type: GET_WITHDRAWAL_REQUEST_SUCCESS,
        payload: responce.data,
      });

      console.log("get withdrawal request ------".responce.data);
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: GET_WITHDRAWAL_REQUEST_FAILURE,
        payload: error.message,
      });
    }
  };

export const addPaymentDetails =
  ({ paymentDetails, jwt }) =>
  async (dispatch) => {
    dispatch({ type: ADD_PAYMENTDETAILS_REQUEST });

    try {
      const responce = await axios.post(
        `http://localhost:8080/api/payment-details`,
        paymentDetails,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: ADD_PAYMENTDETAILS_SUCCESS,
        payload: responce.data,
      });

      console.log("add payment details ------", responce.data);
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: ADD_PAYMENTDETAILS_FAILURE,
        payload: error.message,
      });
    }
  };

export const getPaymentDetails =
  ({ jwt }) =>
  async (dispatch) => {
    dispatch({ type: GET_PAYMENTDETAILS_REQUEST });

    console.log("jwtttttt", jwt);

    try {
      const responce = await axios.get(
        `http://localhost:8080/api/payment-details`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: GET_PAYMENTDETAILS_SUCCESS,
        payload: responce.data,
      });
      console.log("get paymenbt details of of of of of  ------", responce.data);
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: GET_PAYMENTDETAILS_FAILURE,
        payload: error.message,
      });
    }
  };
