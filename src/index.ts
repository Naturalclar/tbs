import {
  app,
  BrowserWindow,
  TouchBar,
  globalShortcut,
  Menu,
  MenuItem
} from "electron";

import { store } from "./store";

const { TouchBarButton } = TouchBar;

let activeIndex: number = 0;

app.once("ready", () => {
  const buttons = store.get("buttons");

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
        NextTab,
        PrevTab,
        {
          role: "quit"
        }
      ]
    }),
    new MenuItem({
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" }
      ]
    })
  ]);
  Menu.setApplicationMenu(menu);
  window.setTouchBar(touchBar);
});

app.on("will-quit", () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});
