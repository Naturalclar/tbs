import { app, BrowserWindow, TouchBar } from "electron";
import { TWEETDECK, YOUTUBE, GITHUB, GMAIL, SLACK } from "./const";

const { TouchBarButton } = TouchBar;

let window: BrowserWindow;

const YouTubeButton = new TouchBarButton({
  label: "YouTube",
  backgroundColor: "#c4302b",
  click: () => {
    window.loadURL(YOUTUBE);
  }
});

const TweetDeckButton = new TouchBarButton({
  label: "TweetDeck",
  backgroundColor: "#38A1F3",
  click: () => {
    window.loadURL(TWEETDECK);
  }
});

const GitHubButton = new TouchBarButton({
  label: "GitHub",
  backgroundColor: "#333",
  click: () => {
    window.loadURL(GITHUB);
  }
});

const GmailButton = new TouchBarButton({
  label: "Gmail",
  backgroundColor: "#D44638",
  click: () => {
    window.loadURL(GMAIL);
  }
});
const SlackButton = new TouchBarButton({
  label: "Slack",
  backgroundColor: "#7c3085",
  click: () => {
    window.loadURL(SLACK);
  }
});

const touchBar = new TouchBar({
  items: [
    YouTubeButton,
    TweetDeckButton,
    GitHubButton,
    GmailButton,
    SlackButton
  ]
});

app.once("ready", () => {
  window = new BrowserWindow({
    titleBarStyle: "hiddenInset",
    width: 1080,
    height: 800,
    backgroundColor: "#000",
    movable: true
  });
  window.loadURL(TWEETDECK);
  window.setTouchBar(touchBar);
});
