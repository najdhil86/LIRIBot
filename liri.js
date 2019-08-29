require("dotenv").config();

// const spotify_id = process.env.SPOTIFY_ID

// console.log(spotify_id);

var operation = process.argv[2];

var user_input = process.argv[3];

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var axios = require('axios');



if (operation == "concert-this") {

  console.log("hi")

} else if (operation == "spotify-this-song") {



  spotify.search({type: 'track', query: user_input, limit: 20}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
    console.log(JSON.stringify(data.tracks.items[0].album.artists[0].name))
    console.log(JSON.stringify(data.tracks.items[0].album.name)) 
  });


    
} else if (operation == "movie-this") {

  console.log("hi")
    
} else if (operation == "do-what-it-says") {

  console.log("hi")
    
}