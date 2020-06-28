const initialState = {
  isAuthenticated: false,
  session: null,
};
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "setIsAuthenticated":
      return { ...state, isAuthenticated: action.payload };
    case "setSession":
      return { ...state, session: action.payload };
    default:
      return state;
  }
}
