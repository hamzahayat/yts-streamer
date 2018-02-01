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
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file:',
        slashes: true
    }))
    
    //Open Developer Console 
    mainWindow.webContents.openDevTools("detach")

    //Set Window variable to Null on close
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}



// ipcMain.on('openFile', (event, path) => {

//     //Declare Variable Constants
//     const {dialog} = require('electron');
//     const fs = require('fs');

//     //Show Open Dialog Box
//     dialog.showOpenDialog(function(fileNames){
       
//         //If No File Selected
//         if (fileNames === undefined){
//             console.log("No File Selected");
//         } else{
//             readFile(fileNames[0]);
//         }
//     });

//     //Read File Function
//     function readFile(filepath){
//         fs.readFile(filepath, 'utf-8', (err, data) => {
            
//             if (err){
//                 alert("An Error ocurred reading the file :" + err.message);
//                 return
//             }

//             //Handle the file content
//             event.sender.send('fileData', data);

//         });
//     }

// });

app.on('ready', createWindow);