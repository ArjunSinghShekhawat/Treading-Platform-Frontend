import axios from "axios";
import {
  ADD_COIN_WATCHLIST_FAILURE,
  ADD_COIN_WATCHLIST_REQUEST,
  ADD_COIN_WATCHLIST_SUCCESS,
  GET_USER_WATCHLIST_FAILURE,
  GET_USER_WATCHLIST_REQUEST,
  GET_USER_WATCHLIST_SUCCESS,
} from "./ActionType";

export const getUserWatchList =
  ({ jwt }) =>
  async (dispatch) => {
    console.log("hyyyyyyyyyyyyyyyyyyyyyyyyy");
    dispatch({ type: GET_USER_WATCHLIST_REQUEST });

    console.log("watch list of user ", jwt);
    try {
      const responce = await axios.get(
        "http://localhost:8080/api/watchlist/user",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({ type: GET_USER_WATCHLIST_SUCCESS, payload: responce.data });
      console.log("get user watchlist ", responce.data);
    } catch (error) {
      console.log("error ", error.responce.data);
      dispatch({ type: GET_USER_WATCHLIST_FAILURE, error: error.message });
    }
  };

export const addItemToWatchList =
  ({ coinId, jwt }) =>
  async (dispatch) => {
    console.log("coin id and jwt  -------------------------", coinId, jwt);
    dispatch({ type: ADD_COIN_WATCHLIST_REQUEST });
    try {
      const responce = await axios.patch(
        `http://localhost:8080/api/watchlist/add/coin/${coinId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({ type: ADD_COIN_WATCHLIST_SUCCESS, payload: responce.data });
      console.log("add item to watchlist  ", responce.data);
    } catch (error) {
      console.log("error ", error.responce.data);
      dispatch({ type: ADD_COIN_WATCHLIST_FAILURE, error: error.message });
    }
  };
