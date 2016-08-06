const {app, BrowserWindow} = require("electron");

let win;

function createWindow() {
  win = new BrowserWindow({frame: false, show: false, minWidth: 600, minHeight: 250});
  win.loadURL(`file://${__dirname}/client/index.html`);
  win.toggleDevTools();
  win.on("closed", function () {
    win = null
  });
  win.once("ready-to-show", function() {
    win.show();
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  app.quit()
});
