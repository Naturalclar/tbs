import {
  app,
  BrowserWindow,
  TouchBar,
  globalShortcut,
  Menu,
  MenuItem
} from "electron";
import { TWEETDECK, YOUTUBE, GITHUB, GMAIL, SLACK, PLAYMUSIC,SALESFORCE } from "./const";

const { TouchBarButton } = TouchBar;

let window: BrowserWindow;
let activeIndex: number = 0;

type ButtonProps = {
  label: string;
  backgroundColor: string;
  url: string;
};

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

const template = [
  { role: "appMenu", label: "Foo" },

  {
    role: "fileMenu",
    label: "File",
    submenu: [{ role: "close" }]
  },

  {
    label: "Edit",
    role: "editMenu",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },

      [
        { role: "pasteAndMatchStyle" },
        { role: "delete" },
        { role: "selectAll" },
        { type: "separator" },
        {
          label: "Speech",
          submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }]
        }
      ]
    ]
  },

  {
    role: "windowMenu",
    label: "Window",
    submenu: [
      { role: "minimize" },
      { role: "zoom" },
      [
        { type: "separator" },
        { role: "front" },
        { type: "separator" },
        { role: "window" }
      ]
    ]
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click() {
          require("electron").shell.openExternalSync("https://electronjs.org");
        }
      }
    ]
  }
];

app.once("ready", () => {
  // Register a 'ControlOrControl+X' shortcut listener.
  const toggleShortcut = globalShortcut.register("Control+X", () => {
    window.isFocused() ? window.hide() : window.show();
  });

  if (!toggleShortcut) {
    console.log("registration failed");
  }

  const window = new BrowserWindow({
    frame: false,
    width: 1080,
    height: 800,
    backgroundColor: "#0000",
    transparent: true,
    movable: true
  });

  const touchBar = new TouchBar({
    items: buttons.map(
      ({ label, backgroundColor, url }, index) =>
        new TouchBarButton({
          label,
          backgroundColor,
          click: () => {
            activeIndex = index;
            window.loadURL(url);
          }
        })
    )
  });

  const NextTab = {
    label: "Next",
    accelerator: "Shift+Command+Right",
    click: () => {
      if (activeIndex + 1 === buttons.length) {
        activeIndex = 0;
      } else {
        activeIndex = activeIndex + 1;
      }
      window.loadURL(buttons[activeIndex].url);
    }
  };
  const PrevTab = {
    label: "Prev",
    accelerator: "Shift+Command+Left",
    click: () => {
      if (activeIndex - 1 < 0) {
        activeIndex = buttons.length - 1;
      } else {
        activeIndex = activeIndex - 1;
      }
      window.loadURL(buttons[activeIndex].url);
    }
  };

  const m = Menu.buildFromTemplate([
    new MenuItem({
      label: "File",
      submenu: [
        NextTab,
        PrevTab,
        {
          role: "quit"
        }
      ]
    })
  ]);
  Menu.setApplicationMenu(m);
  window.setTouchBar(touchBar);
});

app.on("will-quit", () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});
