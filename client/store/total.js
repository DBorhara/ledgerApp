import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_TOTAL = "GET_TOTAL";
const RESET_TOTAL = "RESET_TOTAL";

/**
 * INITIAL STATE
 */
const initialState = { total: { amount: 0 } };

/**
 * ACTION CREATORS
 */
const getTotal = (totalAmount) => ({ type: GET_TOTAL, payload: totalAmount });
const resetTotal = (zeroed) => ({ type: RESET_TOTAL, payload: zeroed });

export const fetchTotal = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/total");
    dispatch(getTotal(response.data.amount));
  } catch (error) {
    console.log(error);
  }
};

export const zeroedTotal = () => async (dispatch) => {
  try {
    const response = await axios.post("/api/total/resetTotal");
    dispatch(resetTotal(response.data.amount));
  } catch (error) {
    console.log(error);
  }
};

/**
 * REDUCER
 */
export const totalsReducer = function (state = initialState.total, action) {
  switch (action.type) {
    case GET_TOTAL:
      return { ...state, amount: action.payload };
    case RESET_TOTAL:
      return { ...state, amount: action.payload };

    default:
      return state;
  }
};
