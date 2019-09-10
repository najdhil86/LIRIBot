require("dotenv").config();

var operation = process.argv[2];

var user_input = process.argv.slice(3).join(" ");

var keys = require("./keys.js");

const axios = require("axios");

const moment = require("moment");


const Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

//Concert This

function concert_this(query) {
  const output = [];
    axios
      .get(
        `https://rest.bandsintown.com/artists/${query}/events?app_id=codingbootcamp`
      )
      .then(function(response) {
        for (let i = 0; i < response.data.length; i++) {
        
          output.push(response.data[i].venue.name);

          output.push(
            response.data[i].venue.city + ", " + response.data[i].venue.country
          );

          var concert_date = response.data[i].datetime;

          output.push(moment(concert_date).format("L"));
        }
        
      })
      
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });

      return console.log(output.join('\n'))
}

//Testing the functionality of Concert This
if (operation == 'concert-this'){

  console.log(concert_this(user_input));
}

// Spotify This Song

function spotify_this_song(query) {
  return spotify.search({ type: "track", query: query, limit: 20 })
    .then(function (data) {

      const output = [];

      for (let i = 0; i < data.tracks.items.length; i++) {

        output.push("Artist = " + data.tracks.items[i].album.artists[0].name);
        output.push("Album:" + data.tracks.items[i].album.name);
        output.push("Song: " + data.tracks.items[i].name);
        output.push("Link: " + data.tracks.items[i].external_urls.spotify);
      }
      return output.join('\n')
    });
}

// Making sure the user sees results of The Sign by Ace of Base if they do not search for a song
if (operation == "spotify-this-song") {
  let query = user_input;
  if (query == undefined) {
    query = "The Sign Ace of Base";
  }
  
  spotify_this_song(user_input).then(function(output) {
    console.log(output);
  });
}

//Movie This
function movie_this(a, b) {
  if (a == "movie-this") {
    axios
      .get(`https://www.omdbapi.com/?t=${b}&y=&plot=short&apikey=trilogy`)
      .then(function(response) {
        console.log(
          "================================================================="
        );

        console.log("Title: " + response.data.Title);

        console.log("Year: " + response.data.Year);

        console.log("IMDB Rating: " + response.data.imdbRating);

        for (let i = 0; i < response.data.Ratings.length; i++) {
          let rating = response.data.Ratings[i];

          if (rating.Source == "Rotten Tomatoes") {
            console.log("Rotten Tomatoes Rating: " + rating.Value);

            break;
          }
        }

        console.log("Country: " + response.data.Country);

        console.log("Language: " + response.data.Language);

        console.log("Plot: " + response.data.Plot);

        console.log("Actors: " + response.data.Actors);

        console.log(" ");

        console.log(
          "================================================================="
        );
      })

      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }
}

// Making sure the user sees result of Mr. Nobody if they do not search for a movie

if (operation == "movie-this" && process.argv[3] == undefined) {
  console.log(movie_this(operation, "Mr. Nobody"));
} else {
  console.log(movie_this(operation, user_input));
}

// Do What it Says

if (operation == "do-what-it-says") {
  var fs = require("fs");

  var contents = fs.readFileSync("./random.txt", "utf8");

  var text_input = contents.split(",");

  var says_command = text_input[0];
  var says_user_input = text_input[1];

  if (says_command == "spotify-this-song") {
    console.log(spotify_this_song(says_command, says_user_input));
  } else if (says_command == "concert_this") {
    console.log(concert_this(says_command, says_user_input));
  } else if (says_command == "movie-this") {
    console.log(movie_this(says_command, says_user_input));
  }
}
