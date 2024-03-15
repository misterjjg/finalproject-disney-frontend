import {
  apiKey,
  checkResponse,
  currentDate,
  getPreviousWeek,
} from "./constants";

export function getNews(userInput) {
  return fetch(
    `https://nomoreparties.co/news/v2/everything?q=${userInput}&from=${getPreviousWeek()}&to=${currentDate}&sortBy=publishedAt&apiKey=${apiKey}`
  ).then(checkResponse);
}
