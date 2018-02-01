//Declare Imports

const dragDrop = require('drag-drop');
const $ = require('jquery');

// var torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent';

//Set up IPC
const { ipcRenderer } = require('electron');
var interval;

var searchMovieBtn = document.getElementById('search-movie-btn');

//Setup Button On Click Event
$('#search-movie-btn').click(()=>{

     //Cache Selectors
     $queryTerm = $("#query-term");
    searchMovie($queryTerm.val());
});

//Function To search Movie
function searchMovie(queryTerm) {

    console.log("button-pressed");

    //Declare API Url Variable
    var apiURL = "https://yts.ag/api/v2/list_movies.json?query_term=";
    var apiQueryURL = apiURL + encodeURIComponent(queryTerm.trim());

    //Setup Ajax Request
    $.ajaxSetup({
        url: apiQueryURL,
        dataType: 'json',
        cache: false,
        type: 'GET',
        global: false,
        timeout: 60000,
        success: processJSON,
        error: function () {
            $('#result').text("Error, could not load JSON");
        }
    });
    //Call Ajax Call
    $.ajax();
}

//Function to Process JSON
function processJSON(json) {
    
}

ipcRenderer.send('openFile', () => {
    console.log("Event sent.");
});

ipcRenderer.on('fileData', (event, data) => {
    console.log(data);
});

//client.add(torrentId, downloadTorrent);

function downloadTorrent(torrent) {
    //Find MP4 File
    var file = torrent.files.find(function (file) {
        return file.name.endsWith('.mp4');
    });
    //Stream File To Browser
    file.appendTo('.video-container');

    interval = setInterval(function () {
        console.log('Progress: ' + (torrent.progress * 100).toFixed(1) + '%');
        console.log(prettyBytes(client.downloadSpeed) + '/s');
    }, 1000);
}

// Human readable bytes util
function prettyBytes(num) {
    var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    if (neg) num = -num
    if (num < 1) return (neg ? '-' : '') + num + ' B'
    exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
    num = Number((num / Math.pow(1000, exponent)).toFixed(2))
    unit = units[exponent]
    return (neg ? '-' : '') + num + ' ' + unit
}