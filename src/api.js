import axios from 'axios';

const api_address = "http://localhost:8080";

export function postRegistration(username,password){
  return axios.post(`${api_address}/registration`, {
    username: username,
    password: password
  })
    .then(r => {
      console.log(r);
      return axios.post(`${api_address}/login`, {
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
  return axios.post(`${api_address}/login`, {
    username: username,
    password: password
  })
    .then(r => {
      console.log(r);
      return r;
    })
    .catch(err => {
      console.error(err);
    })
}

export function postPic(pic,userid){
  return axios.post(`${api_address}/pic`,{
    pic: pic,
    userid: userid
  })
    .then(r => {
      return pic;
    })
    .catch(err => {
      console.error(err);
    })
}

export function getPosts(){
  return axios.get(`${api_address}/posts`)
    .then(r => {
      return r;
    })
    .catch(err => {
      console.error(err);
    })
}

export function searchPosts(mine,term,myid){
  return axios.get(
    `${api_address}/searchposts?mine=${mine}&term=${term}&myid=${myid}`)
    .then(r => {
      return r;
    })
    .catch(err => {
      console.error(err);
    })
}

export function getPost(id){
  return axios.get(`${api_address}/post/${id}`)
    .then(r => {
      return r;
    })
    .catch(err => {
      console.error(err);
    })
}
