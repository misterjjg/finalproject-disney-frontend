import { baseUrl, checkResponse } from "./constants";

export function login({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "applicaion/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .catch((e) => console.error(`Error ${e} in auth login`));
}

export function signup({ email, password, name }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  })
    .then(checkResponse)
    .catch((e) => console.error(`Error ${e} in auth signup`));
}

export function validateToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .then((data) => {
      return data;
    })
    .catch((e) => `Error ${e} in auth validateToken`);
}
