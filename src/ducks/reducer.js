const initState = {
  path: '',
  history: null,
  username: '',
  id: '',
  profile_pic: ''
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

export const loginInfo = (id,username,profile_pic) => {
  return {
    type: "LOGIN_INFO",
    payload: {
      id: id,
      username: username,
      profile_pic: profile_pic
    }
  }
}

export const changePic = pic => {
  return {
    type: "CHANGE_PIC",
    payload: {
      pic: pic
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
    case "LOGIN_INFO":
      console.log("case was login info");
      return {
        ...state,
        id: actions.payload.id,
        username: actions.payload.username,
        profile_pic: actions.payload.profile_pic
      }
    case "CHANGE_PIC":
      console.log("case was change pic");
      return {
        ...state,
        profile_pic: actions.payload.pic
      }
    default:
      console.log("case was default");
      return state;
  }
}

export default reducer;
