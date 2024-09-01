import axios from "axios";
import {
  GET_ALL_ORDER_FAILURE,
  GET_ALL_ORDER_REQUEST,
  GET_ALL_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  PAY_ORDER_FAILURE,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
} from "./ActionType";

export const payOrder =
  ({ jwt, req, amount }) =>
  async (dispatch) => {
    dispatch({ type: PAY_ORDER_REQUEST });

    console.log("data------------------------->", jwt, req, amount);

    try {
      const responce = await axios.post(
        "http://localhost:8080/api/orders/pay",
        req,
        {
          headers: {
            Authorization: `Bearer ${jwt}}`,
          },
        }
      );
      dispatch({ type: PAY_ORDER_SUCCESS, payload: responce.data, amount });
      console.log(
        "order status ------------------------------------------------------------",
        responce.data
      );
    } catch (error) {
      console.log("error", error);
      dispatch({ type: PAY_ORDER_FAILURE, error: error.message });
    }
  };

export const getOrderById =
  ({ jwt, orderId }) =>
  async (dispatch) => {
    dispatch({ type: GET_ORDER_REQUEST });

    try {
      const responce = await axios.get(
        `http://localhost:8080/api/orders/${orderId}`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${jwt}}`,
          },
        }
      );
      dispatch({ type: GET_ORDER_SUCCESS, payload: responce.data });
      console.log("order by id ", responce.data);
    } catch (error) {
      console.log("error", error);
      dispatch({ type: GET_ORDER_FAILURE, error: error.message });
    }
  };

export const getAllOrderForUser =
  ({ jwt, orderType, assetSymbol }) =>
  async (dispatch) => {
    dispatch({ type: GET_ALL_ORDER_REQUEST });

    try {
      const responce = await axios.get(
        `http://localhost:8080/api/orders`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${jwt}}`,
          },
          params: {
            orderType: orderType,
            assetSymbol: assetSymbol,
          },
        }
      );
      dispatch({ type: GET_ALL_ORDER_SUCCESS, payload: responce.data });
      console.log("get All orders", responce.data);
    } catch (error) {
      console.log("error", error);
      dispatch({ type: GET_ALL_ORDER_FAILURE, error: error.message });
    }
  };
