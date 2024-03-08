const apiKey = "eac98321e3904e09af60fc0d8701e640";
const date = new Date();
const tempTo = date.toISOString();
date.setDate(date.getDate() - 7);
// const tempFrom = date.toISOString();
const pageSize = 100;
const to = tempTo.slice(0, 10);
const from = tempTo.slice(0, 10);

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
};

const baseUrl = "https://newsapi.org/v2/everything?";

export const getItems = (q) => {
  return fetch(
    `${baseUrl}q=${q}&apiKey=${apiKey}&from=${from}&to=${to}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        authorization: apiKey,
      },
    }
  )
    .then(checkResponse)
    .then((res) => res.articles);
};
