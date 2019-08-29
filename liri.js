require("dotenv").config();

// const spotify_id = process.env.SPOTIFY_ID

// console.log(spotify_id);

var something = process.argv[2];

var song_name = process.argv[3];

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);



if (something == "concert-this") {

  console.log("hi")

} else if (something == "spotify-this-song") {



  spotify.search({type: 'track', query: song_name}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
    for (var i in data){

      console.log(JSON.stringify(data.tracks.items[i].album.name))


    }
    // console.log(JSON.stringify(data.tracks.items[0].album.artists[0].name))
    // console.log(JSON.stringify(data.tracks.items[0].album.name)) 
  });


    
} else if (something == "movie-this") {

  console.log("hi")
    
} else if (something == "do-what-it-says") {

  console.log("hi")
    
}