import axios from 'axios';
import debug from 'debug';

const debugApi = debug('api');
const apiAddress = '/';

export function postRegistration(username, password) {
  return axios.post(`${apiAddress}registration`, {
    username,
    password,
  })
    .then(() => axios.post(`${apiAddress}user-login`, {
      username,
      password,
    })
      .then((r) => r)
      .catch((err) => {
        debugApi(err);
      }))
    .catch((err) => {
      debugApi(err);
    });
}

export function postLogin(username, password) {
  return axios.post(`${apiAddress}user-login`, {
    username,
    password,
  })
    .then((r) => r)
    .catch((err) => {
      debugApi(err);
    });
}

export function postPic(pic) {
  return axios.post(`${apiAddress}pic`, {
    pic,
  })
    .then(() => pic)
    .catch((err) => {
      debugApi(err);
    });
}

export function getPosts() {
  return axios.get(`${apiAddress}posts`)
    .then((r) => r)
    .catch((err) => {
      debugApi(err);
    });
}

export function searchPosts(mine, term) {
  return axios.get(
    `${apiAddress}searchposts?mine=${mine}&term=${term}`,
  )
    .then((r) => r)
    .catch((err) => {
      debugApi(err);
    });
}

export function getPost(id) {
  return axios.get(`${apiAddress}postdata/${id}`)
    .then((r) => r)
    .catch((err) => {
      debugApi(err);
    });
}

export function newPost(title, content, imgUrl) {
  return axios.post(`${apiAddress}post`, {
    title,
    content,
    img_url: imgUrl,
  })
    .then((r) => r)
    .catch((err) => {
      debugApi(err);
    });
}

export function getApiAuthMe() {
  return axios.get(`${apiAddress}api/auth/me`)
    .then((r) => r)
    .catch((err) => {
      debugApi(err);
    });
}

export function getSession() {
  return axios.get(`${apiAddress}session`)
    .then((r) => r)
    .catch((err) => {
      debugApi(err);
    });
}

export function logout() {
  return axios.post(`${apiAddress}api/auth/logout`, {})
    .then((r) => r)
    .catch((err) => {
      debugApi(err);
    });
}

export function checkUsername(username) {
  return axios.get(`${apiAddress}api/auth/username?username=${username}`)
    .then((r) => r)
    .catch((err) => {
      debugApi(err);
    });
}
