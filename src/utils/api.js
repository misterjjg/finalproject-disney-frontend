import { baseUrl, checkResponse } from "./constants";

function getSavedArticles(token) {
  return fetch(`${baseUrl}/articles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function saveNews(card, token) {
  return fetch(`${baseUrl}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: card.title,
      description: card.description,
      url: card.url,
      publishedAt: card.publishedAt,
      source: card.source.name,
      image: card.urlToImage,
      keywords: card.keywords,
      save: card.save,
    }),
  }).then(checkResponse);
}

function deleteSave(card, token) {
  return fetch(`${baseUrl}/articles/saved`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

const Api = {
  getSavedArticles,
  saveNews,
  deleteSave,
};

export default Api;
