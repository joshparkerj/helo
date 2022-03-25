const initState = {
  path: '',
  history: null,
  username: '',
  profile_pic: '',
};

export const setPath = (path, history) => ({
  type: 'GET_PATH',
  payload: {
    path,
    history,
  },
});

export const loginInfo = (username, profilePic) => ({
  type: 'LOGIN_INFO',
  payload: {
    username,
    profile_pic: profilePic,
  },
});

export const changePic = (pic) => ({
  type: 'CHANGE_PIC',
  payload: {
    pic,
  },
});

const reducer = (state, actions) => {
  const s = state || initState;
  switch (actions.type) {
    case 'GET_PATH':
      return {
        ...s,
        path: actions.payload.path,
        history: actions.payload.history,
      };
    case 'LOGIN_INFO':
      return {
        ...s,
        username: actions.payload.username,
        profile_pic: actions.payload.profile_pic,
      };
    case 'CHANGE_PIC':
      return {
        ...s,
        profile_pic: actions.payload.pic,
      };
    default:
      return s;
  }
};

export default reducer;
