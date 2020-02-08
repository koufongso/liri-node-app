require("dotenv").config();
var keys = require("./keys.js");


var input = process.argv.splice(2); // take out the first 2 "irrelevent input"
var cmd = input[0]; // take first input as command
var target = input.slice(1); // take the remaining input as target (name)
// console.log(cmd);
// console.log(target);
target = target.join("+");// process the name
operate(cmd, target);


// command cases
function operate(cmd, target) {
    switch (cmd) {
        case "concert-this":
            if (target.length != 0) {
                SearchBandIntTown(target);
            } else {
                console.log("You must enter a artist/band's name")
            }
            break;
        case "spotify-this-song":
            if (target.length != 0) {
                SearchSpotify(target);
            } else {
                console.log("You must enter a song's name")
            }
            break;
        case "movie-this":
            if (target.length != 0) {
                SearchMovie(target);
            } else {
                SearchMovie("Mr. Nobody"); // for empty input
            }
            break;
        case "do-what-it-says":
            toDo();
            break;
        default:
            console.log("invalid command");
    }
}



// define corresponding functions
/**
 * It will call Bands in Town Artist Events API and display the information 
 * @param {String} name artist/band name
 */
function SearchBandIntTown(name) {
    var axios = require("axios");
    var id = "codingbootcamp";
    var query = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=" + id;
    var log = "";
    axios.get(query)
        .then(function (response) {
            // console.log("-----------------------------------");
            // console.log(response.data.length);
            for (var i = 0; i < response.data.length; i++) {
                var venue = response.data[i].venue;
                // process location string
                var location = "";
                if (venue.city != "") {
                    location += venue.city;
                }
                if (venue.region != "") {
                    if (location != "") {
                        location += ", "
                    }
                    location += venue.city;
                }

                if (venue.country != "") {
                    if (location != "") {
                        location += ", "
                    }
                    location += venue.country;
                }

                // process date into MM/DD/YYYY format
                var temp = response.data[i].datetime.split("T")[0];
                temp = temp.split("-");
                var date = temp[1] + "/" + temp[2] + "/" + temp[0];
                var result = "-----------------" + (i + 1) + "-----------------\n" +
                    "Name of Venue: " + venue.name + "\n" +
                    "Venue Location: " + location + "\n" +
                    "Date of Evnet: " + date + "\n";
                console.log(result);
                log += result;
            }
            writeLog("concert-this", name, log);
        })
        .catch(function (error) {
            console.log("---------------Error---------------");
            if (error.response) {
                console.log(error.response.data);
                log = error.response.data;
            } else if (error.request) {
                console.log(error.request);
                log = error.request;
            } else {
                console.log("Error", error.message);
                log = "Error " + error.message;
            }
            writeLog("concert-this", name, JSON.stringify(log));
        });
}



/**
 * It will call Spotify API to search the song and display the info
 * @param {String} name search song name in Spotify 
 */
function SearchSpotify(name) {
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    var log ="";
    spotify
        .search({ type: 'track', query: name })
        .then(function (response) {
            var data = response.tracks.items[0];
            if(data!=undefined){
                var artists = "";
                for (var i = 0; i < data.artists.length; i++) {
                    artists += data.artists[i].name;
                    if (i != data.artists.length - 1) {
                        artists += ", ";
                    }
                }
                var output = "-----------------------------------\n" +
                    "Artist(s): " + artists + "\n" +
                    "Song: " + data.name + "\n" +
                    "Preview link: " + data.preview_url + "\n" +
                    "Album: " + data.album.name + "\n";
                console.log(output);
                log = output;
            }else{
                log="Song not found!";
                console.log(log);
                
            }

            writeLog("spotify-this-song", name, log);
        })
        .catch(function (err) {
            console.log("---------------Error---------------");
            if (err.response) {
                console.log(err.response.data);
                log = err.response.data;
            } else if (err.request) {
                console.log(err.request);
                log = err.request;
            } else {
                console.log("Error", err.message);
                log = "Error " + err.message;
            }
            writeLog("spotify-this-song", name, JSON.stringify(log));
        });
}


function SearchMovie(name) {
    var axios = require("axios");
    var apiKey = "trilogy";
    var query = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=" + apiKey;
    var log=""
    axios.get(query).then(
        function (response) {
            // console.log(response)
            var data = response.data;
            if(data.Response!="False"){
                var output = "-----------------------------------\n" +
                "Title: " + data.Title + "\n" +
                "Year: " + data.Year + "\n" +
                "IMDB Rating: " + data.imdbRating + "\n" +
                "Rotten Tomatoes Rating: " + data.Ratings[2].Value + "\n" +
                "Country: " + data.Country + "\n" +
                "Language: " + data.Language + "\n" +
                "Plot: " + data.Plot + "\n" +
                "Actors: " + data.Actors + "\n";
                console.log(output);
                log = output;
            }else{
                console.log(data.Error);
                log  = data.Error;
            }

            writeLog("moive-this", name, log);
        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Error---------------");
                console.log(error.response.data);
                log = error.response.data;
            } else if (error.request) {
                console.log(error.request);
                log = error.request;
            } else {
                console.log("Error", error.message);
                log = "Error " + error.message;
            }
            writeLog("movie-this", name, JSON.stringify(log));
        });
}

/**
 * A special version of searchSpotify where the song's name will be read from a pre-defined file
 */
function toDo() {
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        inputList = data.split("\r\n")
        for (var i = 0; i < inputList.length; i++) {
            var temp = inputList[i].split(",");
            operate(temp[0], temp[1]);
        }
    })
}


/**
 * Logging out the comand and reuslt to a file
 * @param {String} cmd input command
 * @param {String} target  input commmand argument
 * @param {String} result cmd result
 */
function writeLog(cmd, target, result) {
    var fs = require("fs");
    var time = Date();
    var output = "********************************************************\n" + time + "\n" + "<--Command: " + cmd + " " + target + "\n" + "-->Output:\n" + result+"\n";
    fs.appendFileSync("log.txt", output, function (err) {
        if (err) {
            return console.log(err);
        }
    })
}

