const initialState = {
  actionsHistory: [],
};
export default function historyReducer(state = initialState, action) {
  switch (action.type) {
    case "saveAction":
      var newActionsHistory = [...state.actionsHistory];
      var savedIndex = null;
      state.actionsHistory.map((savedAction, index) => {
        if (savedAction.request === action.payload.request) savedIndex = index;
      });
      if (savedIndex !== null) {
        newActionsHistory.splice(savedIndex, 1);
        newActionsHistory.unshift(action.payload);
        if (newActionsHistory.length >= 15) {
          ///15 или 20?
          newActionsHistory.pop();
        }
      } else {
        newActionsHistory = newActionsHistory.concat(action.payload);
      }
      return { actionsHistory: newActionsHistory };
    case "delAction":
      var newActionsHistory = [...state.actionsHistory];
      var savedIndex = null;
      state.actionsHistory.map((savedAction, index) => {
        if (savedAction.request === action.payload) {
          savedIndex = index;
        }
      });
      newActionsHistory.splice(savedIndex, 1);
      return { actionsHistory: newActionsHistory };
    case "recoverHistory":
      return { actionsHistory: [...action.payload] };
    case "clearHistory":
      return { actionsHistory: [] };
    default:
      return state;
  }
}
