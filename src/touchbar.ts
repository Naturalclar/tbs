import { app, BrowserWindow, TouchBar, globalShortcut } from "electron";
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
  // Register a 'ControlOrControl+X' shortcut listener.
  const ret = globalShortcut.register("Control+X", () => {
    window.isFocused() ? window.hide() : window.show();
  });

  if (!ret) {
    console.log("registration failed");
  }

  window = new BrowserWindow({
    frame: false,
    width: 1080,
    height: 800,
    backgroundColor: "#0000",
    transparent: true,
    movable: true
  });

  window.setTouchBar(touchBar);
});

app.on("will-quit", () => {
  // Unregister a shortcut.
  globalShortcut.unregister("Control+X");
});
