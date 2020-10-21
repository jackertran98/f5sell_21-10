import { LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT, START_THU } from "../action/types";

const INIT_STATE = {
  status: "",
  authUser: {},
  currentLocation: null,
  username: "",
  startthu:"",
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        status: "AUTHED",
        authUser: action.payload,
        username: action.payload.USERNAME,
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        status: "",
        authUser: {},
        username: "",
      };
    }
    case LOG_OUT: {
      return {
        type: "",
        authUser: {},
        status: "",
        username: "",
      };
    }
    case START_THU:{
      return {
        startthu:action.payload.data
      }
      
    }
    default:
      return { ...state };
  }
};
