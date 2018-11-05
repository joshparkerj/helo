import axios from 'axios';

const api_address = "/";

export function postRegistration(username,password){
  return axios.post(`${api_address}registration`, {
    username: username,
    password: password
  })
    .then(r => {
      return axios.post(`${api_address}user-login`, {
        username: username,
        password: password
      })
        .then(r => {
          return r;
        })
        .catch(err => {
          console.error(err);
        })
    })
    .catch(err => {
      console.error(err);
    })
}

export function postLogin(username,password){
  return axios.post(`${api_address}user-login`, {
    username: username,
    password: password
  })
    .then(r => {
      return r;
    })
    .catch(err => {
      console.error(err);
    })
}

export function postPic(pic){
  return axios.post(`${api_address}pic`,{
    pic: pic
  })
    .then(r => {
      return pic;
    })
    .catch(err => {
      console.error(err);
    })
}

export function getPosts(){
  return axios.get(`${api_address}posts`)
    .then(r => {
      return r;
    })
    .catch(err => {
      console.error(err);
    })
}

export function searchPosts(mine,term){
  return axios.get(
    `${api_address}searchposts?mine=${mine}&term=${term}`)
    .then(r => {
      return r;
    })
    .catch(err => {
      console.error(err);
    })
}

export function getPost(id){
  return axios.get(`${api_address}postdata/${id}`)
    .then(r => {
      return r;
    })
    .catch(err => {
      console.error(err);
    })
}

export function newPost(title,content,img_url){
  return axios.post(`${api_address}post`, {
    title: title,
    content: content,
    img_url: img_url
  })
    .then(r => {
      return r;
    })
    .catch(err => {
      console.error(err);
    })
}

export function getApiAuthMe(){
  return axios.get(`${api_address}api/auth/me`)
    .then(r => {
      return r;
    })
    .catch(err => {
      console.error(err);
    })
}

export function getSession(){
  return axios.get(`${api_address}session`)
    .then(r => {
      return r;
    })
    .catch(err => {
      console.error(err);
    })
}

export function logout(){
  return axios.post(`${api_address}api/auth/logout`,{})
    .then(r => {
      return r;
    })
    .catch(err => {
      console.error(err);
    })
}
