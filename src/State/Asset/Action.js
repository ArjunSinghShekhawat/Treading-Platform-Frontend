import axios from "axios";
import {
  GET_ASSET_DETAILS_FAILURE,
  GET_ASSET_DETAILS_REQUEST,
  GET_ASSET_DETAILS_SUCCESS,
  GET_ASSET_FAILURE,
  GET_ASSET_REQUEST,
  GET_ASSET_SUCCESS,
  GET_USER_ASSET_FAILURE,
  GET_USER_ASSET_REQUEST,
  GET_USER_ASSET_SUCCESS,
} from "./ActionType";

export const getAssetById =
  ({ assetId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: GET_ASSET_REQUEST });
    try {
      const responce = await axios.get(
        `http://localhost:8080/api/asset/${assetId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: GET_ASSET_SUCCESS, payload: responce.data });
      console.log("get Asset data ", responce.data);
    } catch (error) {
      console.log("error", error);
      dispatch({ type: GET_ASSET_FAILURE, error: error.message });
    }
  };

export const getAssetDetails =
  ({ coinId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: GET_ASSET_DETAILS_REQUEST });
    try {
      const responce = await axios.get(
        `http://localhost:8080/api/asset/coin/${coinId}/user`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: GET_ASSET_DETAILS_SUCCESS, payload: responce.data });
      console.log("get Asset details", responce.data);
    } catch (error) {
      console.log("error", error);
      dispatch({ type: GET_ASSET_DETAILS_FAILURE, error: error.message });
    }
  };

export const getUserAsset =
  ({ jwt }) =>
  async (dispatch) => {
    dispatch({ type: GET_USER_ASSET_REQUEST });
    try {
      const responce = await axios.get(`http://localhost:8080/api/asset`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: GET_USER_ASSET_SUCCESS, payload: responce.data });
      console.log("get user  Asset", responce.data);
    } catch (error) {
      console.log("error", error);
      dispatch({ type: GET_USER_ASSET_FAILURE, error: error.message });
    }
  };
