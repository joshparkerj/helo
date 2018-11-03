const initState = {
  path: '',
  history: null
}

export const setPath = (path,history) => {
  console.log("set path invoked");
  console.log(path);
  return {
    type: "GET_PATH",
    payload: {
      path: path,
      history: history
    }
  }
}

const reducer = (state=initState, actions) => {
  console.log("reducer invoked");
  console.log("state is: ");
  console.log(state);
  console.log("actions are: ");
  console.log(actions);
  switch(actions.type){
    case "GET_PATH":
      console.log("case was get path");
      return {
        ...state,
        path: actions.payload.path,
        history: actions.payload.history
      }
    default:
      console.log("case was default");
      return state;
  }
}

export default reducer;
