// Import Objects
import { app, BrowserWindow, Menu } from 'electron';
import path from 'path';
import url from 'url';

//Declare Main Window Variable
let mainWindow;

// Function to Create Window
function createWindow() {
  //Create Window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // Navigate To index.html
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, '/index.html'),
      protocol: 'file:',
      slashes: true,
    }),
  );

  // Remove Menu
  //Menu.setApplicationMenu(null);

  //Set Window variable to Null on close
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});
