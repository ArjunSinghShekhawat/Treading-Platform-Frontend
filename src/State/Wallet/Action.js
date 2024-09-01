import axios from "axios";
import {
  DEPOSITE_MONEY_FAILURE,
  DEPOSITE_MONEY_REQUEST,
  DEPOSITE_MONEY_SUCCESS,
  GET_USER_WALLET_FAILURE,
  GET_USER_WALLET_REQUEST,
  GET_USER_WALLET_SUCCESS,
  GET_WALLET_TRANSACTION_FAILURE,
  GET_WALLET_TRANSACTION_REQUEST,
  GET_WALLET_TRANSACTION_SUCCESS,
  TRANSFER_MONEY_REQUEST,
  TRANSFER_MONEY_SUCCESS,
} from "./ActionType";

export const getUserWallet = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_WALLET_REQUEST });

  try {
    const responce = await axios.get("http://localhost:8080/api/wallet", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: GET_USER_WALLET_SUCCESS, payload: responce.data });
    console.log("get user wallet", responce.data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_USER_WALLET_FAILURE,
      error: error.message,
    });
  }
};

export const getWalletTransaction =
  ({ jwt }) =>
  async (dispatch) => {
    dispatch({ type: GET_WALLET_TRANSACTION_REQUEST });

    try {
      const responce = await axios.get(
        "http://localhost:8080/api/wallet/transaction",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: GET_WALLET_TRANSACTION_SUCCESS,
        payload: responce.data,
      });
      console.log("wallet transaction history ", responce.data);
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_WALLET_TRANSACTION_FAILURE,
        error: error.message,
      });
    }
  };

export const depositeMoney =
  ({ jwt, orderId, paymentId, navigate }) =>
  async (dispatch) => {
    dispatch({ type: DEPOSITE_MONEY_REQUEST });

    console.log("--------------------------------------->", orderId, paymentId);

    try {
      const responce = await axios.put(
        "http://localhost:8080/api/wallet/deposit",
        null,
        {
          params: {
            order_id: orderId,
            payment_id: paymentId,
          },
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({ type: DEPOSITE_MONEY_SUCCESS, payload: responce.data });
      navigate("/wallet");
      console.log("deposite money ", responce.data);
    } catch (error) {
      console.log(error);
      dispatch({
        type: DEPOSITE_MONEY_FAILURE,
        error: error.message,
      });
    }
  };

export const paymentHandler =
  ({ jwt, amount, paymentMethod }) =>
  async (dispatch) => {
    dispatch({ type: DEPOSITE_MONEY_REQUEST });

    try {
      const responce = await axios.post(
        `http://localhost:8080/payment/${paymentMethod}/amount/${amount}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      window.location.href = responce.data.paymentUrl;

      //   dispatch({ type: DEPOSITE_MONEY_SUCCESS, payload: responce.data });
      console.log(
        "deposite moneyjjfkjfkdjfkdj  fdfkdjf  dfjkdfjkdf fdkfjdk dfkdjfkdj ",
        responce.data
      );
    } catch (error) {
      console.log(error);
      dispatch({
        type: DEPOSITE_MONEY_FAILURE,
        error: error.message,
      });
    }
  };

export const transferMoney =
  ({ jwt, walletId, reqData }) =>
  async (dispatch) => {
    dispatch({ type: TRANSFER_MONEY_REQUEST });

    try {
      const responce = await axios.put(
        `http://localhost:8080/api/wallet/${walletId}/transfer`,
        reqData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({ type: TRANSFER_MONEY_SUCCESS, payload: responce.data });
      console.log("transfer money ", responce.data);
    } catch (error) {
      console.log(error);
      dispatch({
        type: DEPOSITE_MONEY_FAILURE,
        error: error.message,
      });
    }
  };
