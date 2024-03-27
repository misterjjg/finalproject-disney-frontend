import { baseUrl, checkResponse } from "./constants";

function getSavedArticles(token) {
  return fetch(`${baseUrl}/articles/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function saveNews(card, token, keyword) {
  return fetch(`${baseUrl}/articles/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: card.title,
      text: card.description,
      link: card.url,
      date: card.publishedAt,
      source: card.source.name,
      image: card.urlToImage,
      keyword: keyword,
    }),
  }).then(checkResponse);
}

function deleteSave(articleId, token) {
  return fetch(`${baseUrl}/articles/${articleId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ articleId }),
  }).then(checkResponse);
}

const Api = {
  getSavedArticles,
  saveNews,
  deleteSave,
};

export default Api;
