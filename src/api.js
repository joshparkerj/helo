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
