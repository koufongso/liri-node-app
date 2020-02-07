require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

console.log(spotify);


var input = process.argv.splice(2); // take out the first 2 "irrelevent input"
var cmd = input[0]; // take first input as command
var target = input.slice(1); // take the remaining input as target (name)
console.log(cmd);
console.log(target);


// command cases
switch (cmd) {
    case "concert-this":
        console.log("----> Call concert-this")
        SearchBandIntTown(target);
        break;
    case "spotify-this-song":
        SearchSpotify(target);
        break;
    case "movie-this":
        SearchMovie(target);
        break;
    case "do-what-it-says":
        SearchSpotifyRandom();
        break;
    default:
        console.log("invalid command");
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
    axios.get(query)
        .then(function (response) {
            console.log("-----------------------------------");
            console.log(response.data.length);
            for(var i =0 ; i<response.data.length;i++){
                var venue = response.data[i].venue;
                var location ="";
                if(venue.city!=""){
                    location+=venue.city;
                }
                if(venue.region!=""){
                    if(location!=""){
                        location+=", "
                    }
                    location+=venue.city;
                }

                if(venue.country!=""){
                    if(location!=""){
                        location+=", "
                    }
                    location+=venue.country;
                }
                console.log("-----------------------------------");
                console.log("-----------------"+i+"-----------------");
                console.log("Name of Venue: "+ venue.name);
                console.log("Venue Location: "+ location);
                console.log("Date of Evnet: "+ response.data[i].datetime);
            }
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
        })
}



