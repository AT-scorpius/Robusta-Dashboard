/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved
import axios from 'axios';

// const API_URL =
axios.defaults.baseURL = 'https://passerellesnumeriques-robusta.herokuapp.com/api';
// axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
// call API
export async function callAPI(endpoint, method = 'GET') {
  const token = sessionStorage.getItem('__token__');
  return axios({
    method,
    url: `${endpoint}`,
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.data.data).catch((err) => false);
}

// Post API
export async function APIpost(endpoint, body) {
  const token = sessionStorage.getItem('__token__');
  const method = 'POST';
  return axios({
    method,
    url: endpoint,
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    data: body,
  }).then((res) => res.data.data).catch((err) => false);
}
// API put
export async function APIput(endpoint, body) {
  const token = sessionStorage.getItem('__token__');
  const method = 'PUT';
  return axios({
    method,
    url: endpoint,
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    data: body,
  }).then((res) => res.data.data).catch((err) => false);
}

// Login
export async function callLogin(body, isSave) {
  let token;
  const method = 'POST';
  try {
    return axios({
      method,
      url: 'login',
      headers: {
        Authorization: 'application/json'
      },
      data: body,
    }).then((res) => {
      if (res.data.success) {
        token = res.data.data.token;
        sessionStorage.setItem('__token__', token);
        if (isSave === true) localStorage.setItem('__token__', token);
        return true;
      }
      return false;
    }).catch((err) => false);
  } catch (error) {
    return false;
  }
}

// Create Post
export function createPost(body) {
  const token = sessionStorage.getItem('__token__');
  const method = 'POST';
  return axios({
    method,
    url: 'posts',
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    data: body,
  }).catch(() => false);
}

// Notifications

export async function notice(tit, mes) {
  const body = {
    title: tit,
    message: mes
  };
  const token = sessionStorage.getItem('__token__');
  const endpoint = 'notifications';
  const method = 'POST';
  return axios({
    method,
    url: `${endpoint}`,
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    data: body,
  }).then((res) => res.data.data).catch((err) => false);
}
