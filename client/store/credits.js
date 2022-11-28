import axios from "axios";

/**
 * ACTION TYPES
 */
const APPLY_CREDIT = "APPLY_CREDIT";
const DELETE_CREDIT = "DELETE_CREDIT";
const GET_ALL_CREDITS = "GET_ALL_CREDITS";
const WIPE_CREDITS = "WIPE_CREDITS";

const initialState = {
  credits: [],
};

/**
 * ACTION CREATORS
 */
const getApplyCredit = (name, amount) => {
  return {
    type: APPLY_CREDIT,
    payload: { name, amount },
  };
};
const getAllCredits = (allCredits) => {
  return {
    type: GET_ALL_CREDITS,
    payload: allCredits,
  };
};
const wipeAllCredits = (wipedCredits) => {
  return {
    type: WIPE_CREDITS,
    payload: wipedCredits,
  };
};

/**
 * THUNK CREATORS
 */

export const applyCredit = (creditName, creditAmount) => async (dispatch) => {
  try {
    const response = await axios.post("/api/credits/increment", {
      name: creditName,
      amount: creditAmount,
    });
    const { name, amount } = response.data;
    dispatch(getApplyCredit(name, amount));
  } catch (err) {
    console.error(err);
  }
};

export const deleteCredit = (creditId) => async (dispatch) => {
  try {
    await axios.delete(`/api/credits/${creditId}/delete`);
    dispatch(fetchAllCredits());
  } catch (err) {
    console.error(err);
  }
};

export const fetchAllCredits = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/credits");
    dispatch(getAllCredits(response.data));
  } catch (err) {
    console.error(err);
  }
};

export const clearAllCredits = () => async (dispatch) => {
  try {
    const response = await axios.post("/api/credits/reset");
    dispatch(wipeAllCredits(response.data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export const creditsReducer = function (state = initialState.credits, action) {
  switch (action.type) {
    case GET_ALL_CREDITS:
      return action.payload;
    case APPLY_CREDIT:
      return [...state, action.payload];
    case DELETE_CREDIT:
      return state;
    case WIPE_CREDITS:
      return state;
    default:
      return state;
  }
};
