import { apiURL, baseURL, processResponseServer, apiKey } from "./constants";

function searchCards({ userInput, fromDate, toDate, pageSize }) {
  return fetch(
    `${apiURL}/everything?q=${userInput}&from=${fromDate}&to=${toDate}&pageSize=${pageSize}&apiKey=${apiKey}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: apiKey,
      },
    }
  ).then(processResponseServer);
}

function getCards(token) {
  return fetch(`${baseURL}/articles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processResponseServer);
}

function saveCard(token, cardData) {
  console.log({ token });
  return fetch(`${baseURL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cardData),
  }).then(processResponseServer);
}

function deleteCard(id, token) {
  return fetch(`${baseURL}/articles/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(processResponseServer);
}

export { searchCards, getCards, saveCard, deleteCard };
