const initialState = {
  menuStatus: false,
};

function myReducer(state = initialState, action) {
  if (action.type === "CHANGE_MENU_STATUS") {
    const newState = { ...state, menuStatus: !state.menuStatus };
    return newState;
  }
  return state;
}

export default myReducer;
