const initState = {
  path: '',
  history: null,
  username: '',
  id: '',
  profile_pic: ''
}

export const setPath = (path,history) => {
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
  switch(actions.type){
    case "GET_PATH":
      return {
        ...state,
        path: actions.payload.path,
        history: actions.payload.history
      }
    case "LOGIN_INFO":
      return {
        ...state,
        id: actions.payload.id,
        username: actions.payload.username,
        profile_pic: actions.payload.profile_pic
      }
    case "CHANGE_PIC":
      return {
        ...state,
        profile_pic: actions.payload.pic
      }
    default:
      return state;
  }
}

export default reducer;
