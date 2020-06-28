const initialState = {
  response: "",
  request: "",
  isFetching: false,
  errors: { inRequest: false, inResponse: false },
};
export default function consoleReducer(state = initialState, action) {
  switch (action.type) {
    case "setRequest": {
      return { ...state, request: action.payload };
    }
    case "setResponse": {
      return { ...state, response: action.payload };
    }
    case "setIsFetching": {
      return { ...state, isFetching: action.payload };
    }
    case "setErrors": {
      return { ...state, errors: action.payload };
    }
    default:
      return state;
  }
}
