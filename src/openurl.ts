import open from "open";
import { TWITTER, YOUTUBE, GITHUB, TWEETDECK } from "./const";

export const openTwitter = () => {
  open(TWITTER);
};

export const openYouTube = () => {
  open(YOUTUBE);
};

export const openGitHub = () => {
  open(GITHUB);
};

export const openTweetDeck = () => {
  open(TWEETDECK);
};
