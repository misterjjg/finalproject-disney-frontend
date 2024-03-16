import corgi from "../images/Corgi.png";
import moose from "../images/Moose.png";
import river from "../images/River.png";
import yellowstone from "../images/Yellowstone.png";
import spiral from "../images/Spiral.png";

export const apiKey = "eac98321e3904e09af60fc0d8701e640";

export const ESC_KEYCODE = 27;

export const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const lastWeek = new Date();
export const getPreviousWeek = () => {
  lastWeek.setDate(new Date().getDate() - 7);
  return lastWeek.toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const newsOptions = [
  {
    urlToImage: corgi,
    publishedAt: "November 4, 2020",
    source: "TreeHugger",
    title: "Everyone Needs a Special 'Sit Spot' in Nature",
    description:
      "Ever since I read Richard Louv's influential book, 'Last Child in the Woods,' the idea of having a special 'sit spot' has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find that the world is not what it appears to be.",
    keyword: "Nature",
    url: corgi,
  },
  {
    urlToImage: moose,
    publishedAt: "November 4, 2020",
    source: "National Parks Traveler",
    title: "Grand Teton Renews Historic Crest Trail",
    description:
      "The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be...",
    keyword: "Parks",
    url: moose,
  },
  {
    urlToImage: river,
    publishedAt: "February 19, 2019",
    source: "National Geographic",
    title: "Nature makes you better",
    description:
      "We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.",
    keyword: "Nature",
    url: river,
  },
  {
    urlToImage: yellowstone,
    publishedAt: "October 19, 2020",
    source: "National Geographic",
    title: "Nostalgic Photos of Tourists in U.S. National Parks",
    description:
      "Uri Løvevild Golman and Helle Løvevild Golman are National Geographic Explorers and conservation photographers who just completed a project and book they call their love letter to...",
    keyword: "Yellowstone",
    url: yellowstone,
  },
  {
    urlToImage: spiral,
    publishedAt: "March 16, 2020",
    source: "TreeHugger",
    title: "Scientists Don't Know Why Polaris Is So Weird",
    description:
      "Humans have long relied on the starry sky to push into new frontiers, sail to the very edge of the world and find their way back home again. Even animals look to the stars to guide them.",
    keyword: "Photography",
    url: spiral,
  },
];

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.error}`);
};

export const baseUrl = "http://localhost:3001";
