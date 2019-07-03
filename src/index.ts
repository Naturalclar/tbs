import {
  app,
  BrowserWindow,
  TouchBar,
  globalShortcut,
  Menu,
  MenuItem
} from "electron";
import {
  TWEETDECK,
  YOUTUBE,
  GITHUB,
  GMAIL,
  SLACK,
  PLAYMUSIC,
  SALESFORCE
} from "./const";

const { TouchBarButton } = TouchBar;

const isEnv = process.env.ELECTRON_ENV === "development";

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

  const menu = Menu.buildFromTemplate([
    new MenuItem({
      label: "Default",
      submenu: [
        { role: "about" },
        NextTab,
        PrevTab,
        { role: "hide" },
        { role: "hideothers" },
        { role: "close" },
        { role: "quit" }
      ]
    }),
    new MenuItem({
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "selectall" }
      ]
    }),
    new MenuItem({
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forcereload" },
        { role: "togglefullscreen" },
        { role: "zoomin" },
        { role: "zoomout" }
      ]
    })
  ]);

  // Enable Development Tool for development
  if (isEnv) {
    menu.append(
      new MenuItem({
        label: "Tools",
        submenu: [{ role: "toggledevtools" }]
      })
    );
  }
  Menu.setApplicationMenu(menu);
  window.setTouchBar(touchBar);
});

app.on("will-quit", () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});
