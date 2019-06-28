import Store from "electron-store";
import {
  TWEETDECK,
  YOUTUBE,
  GITHUB,
  GMAIL,
  SLACK,
  PLAYMUSIC,
  SALESFORCE
} from "./const";

type ButtonProps = {
  label: string;
  backgroundColor: string;
  url: string;
};

type StoreProps = ButtonProps[];

// TODO: Make these editable in a config file
const buttons: ButtonProps[] = [
  {
    label: "YouTube",
    backgroundColor: "#c4302b",
    url: YOUTUBE
  },
  {
    label: "TweetDeck",
    backgroundColor: "#38A1F3",
    url: TWEETDECK
  },
  {
    label: "GitHub",
    backgroundColor: "#333",
    url: GITHUB
  },
  {
    label: "Gmail",
    backgroundColor: "#D44638",
    url: GMAIL
  },
  {
    label: "Slack",
    backgroundColor: "#7c3085",
    url: SLACK
  },
  {
    label: "PlayMusic",
    backgroundColor: "#f4522b",
    url: PLAYMUSIC
  },
  {
    label: "SalesForce",
    backgroundColor: "#1798c1",
    url: SALESFORCE
  }
];

export const store = new Store<StoreProps>({ defaults: { buttons } });
