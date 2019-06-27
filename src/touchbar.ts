import {
  app,
  BrowserWindow,
  TouchBar,
  globalShortcut,
  TouchBarButtonConstructorOptions
} from "electron";
import { TWEETDECK, YOUTUBE, GITHUB, GMAIL, SLACK, PLAYMUSIC,SALESFORCE } from "./const";

const { TouchBarButton } = TouchBar;

let window: BrowserWindow;

const buttons: TouchBarButtonConstructorOptions[] = [
  {
    label: "YouTube",
    backgroundColor: "#c4302b",
    click: () => {
      window.loadURL(YOUTUBE);
    }
  },
  {
    label: "TweetDeck",
    backgroundColor: "#38A1F3",
    click: () => {
      window.loadURL(TWEETDECK);
    }
  },
  {
    label: "GitHub",
    backgroundColor: "#333",
    click: () => {
      window.loadURL(GITHUB);
    }
  },
  {
    label: "Gmail",
    backgroundColor: "#D44638",
    click: () => {
      window.loadURL(GMAIL);
    }
  },
  {
    label: "Slack",
    backgroundColor: "#7c3085",
    click: () => {
      window.loadURL(SLACK);
    }
  },
  {
    label: "PlayMusic",
    backgroundColor: "#f4522b",
    click: () => {
      window.loadURL(PLAYMUSIC);
    }
  },
  {
    label: "Salesforce",
    backgroundColor: "#1798c1",
    click: () => {
      window.loadURL(SALESFORCE);
    }
  }
];

const touchBar = new TouchBar({
  items: buttons.map(
    ({ label, backgroundColor, click }) =>
      new TouchBarButton({ label, backgroundColor, click })
  )
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
