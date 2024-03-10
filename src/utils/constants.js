export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2"
    : "newsapi.org/v2";

export const apiURL = "https://nomoreparties.co/news/v2";

export const processResponseServer = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

export const apiKey = "eac98321e3904e09af60fc0d8701e640";
