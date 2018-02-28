//Declare Variables
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const  {ipcMain} = require('electron') 

//Declare Main Window Variable
let mainWindow

//Function to Create Window
function createWindow(){

    //Create Window
    mainWindow = new BrowserWindow({
        width:800,
        height:600
    })

    //Navigate To index.html
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    //Set Window variable to Null on close
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', createWindow);