import axios from "axios";

/**
 * ACTION TYPES
 */
const APPLY_DEBIT = "APPLY_DEBIT";
const DELETE_DEBIT = "DELETE_DEBIT";
const GET_ALL_DEBITS = "GET_ALL_DEBITS";
const WIPE_DEBITS = "WIPE_DEBITS";

const initialState = {
  debits: [],
};

/**
 * ACTION CREATORS
 */
const getApplyDebit = (name, amount) => {
  return {
    type: APPLY_DEBIT,
    payload: { name, amount },
  };
};
const getAllDebits = (allDebits) => {
  return {
    type: GET_ALL_DEBITS,
    payload: allDebits,
  };
};
const wipeAllDebits = (wipedDebits) => {
  return {
    type: WIPE_DEBITS,
    payload: wipedDebits,
  };
};

/**
 * THUNK CREATORS
 */

export const applyDebit = (debitName, debitAmount) => async (dispatch) => {
  try {
    const response = await axios.post("/api/debits/decrement", {
      name: debitName,
      amount: debitAmount,
    });
    const { name, amount } = response.data;
    dispatch(getApplyDebit(name, amount));
  } catch (err) {
    console.error(err);
  }
};

export const deleteDebit = (debitId) => async (dispatch) => {
  try {
    await axios.delete(`/api/debits/${debitId}/delete`);
    dispatch(fetchAllDebits());
  } catch (err) {
    console.error(err);
  }
};

export const fetchAllDebits = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/debits");
    dispatch(getAllDebits(response.data));
  } catch (err) {
    console.error(err);
  }
};

export const clearAllDebits = () => async (dispatch) => {
  try {
    const response = await axios.post("/api/debits/reset");
    dispatch(wipeAllDebits(response.data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export const debitsReducer = function (state = initialState.debits, action) {
  switch (action.type) {
    case GET_ALL_DEBITS:
      return action.payload;
    case APPLY_DEBIT:
      return [...state, action.payload];
    case DELETE_DEBIT:
      return state;
    case WIPE_DEBITS:
      return state;
    default:
      return state;
  }
};
