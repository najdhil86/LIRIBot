require("dotenv").config();

// const spotify_id = process.env.SPOTIFY_ID

// console.log(spotify_id);

var operation = process.argv[2];

var user_input = process.argv.slice(3).join(" ");

var keys = require("./keys.js");

//Variables for Spotify-this-song

const Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

//Variables for movie-this and concert-this

const axios = require("axios");

const moment = require("moment");

var artist = process.argv.slice(3).join(" ");

//Variable for look-for-it

var fs = require("fs");
function concert_this(a,b){
  if (a == "concert-this") {
    axios
      .get(
        `https://rest.bandsintown.com/artists/${b}/events?app_id=codingbootcamp`
      )
      .then(function(response) {
        for (let i = 0; i < 100; i++) {
          console.log(
            "================================================================="
          );
          console.log(" ");
  
          console.log(response.data[i].venue.name);
  
          console.log(
            response.data[i].venue.city + ", " + response.data[i].venue.country
          );
  
          var concert_date = response.data[i].datetime;
  
          console.log(moment(concert_date).format("L"));
  
          console.log(" ");
          console.log(
            "================================================================="
          );
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


}

}

console.log(concert_this(operation,user_input))

function spotify_this_song(a,b){
  if (a == undefined){
    spotify.search({ type: "track", query: "The Sign Ace of Base", limit: 20 }, function(
      err,
      data
    ) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
  
      for (let i = 0; i < 100; i++) {
        console.log(
          "================================================================="
        );
        console.log(" ");
  
        console.log(
          "Artist = " + JSON.stringify(data.tracks.items[i].album.artists[0].name)
        );
        console.log("Album:" + JSON.stringify(data.tracks.items[i].album.name));
        console.log("Song: " + JSON.stringify(data.tracks.items[i].name));
        console.log(
          "Link: " + JSON.stringify(data.tracks.items[i].external_urls.spotify)
        );
  
        console.log(" ");
        console.log(
          "================================================================="
        );
      }
    });
    
  }
  if (a == "spotify-this-song") {
    spotify.search({ type: "track", query: b, limit: 20 }, function(
      err,
      data
    ) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      for (let i = 0; i < 100; i++) {
        console.log(
          "================================================================="
        );
        console.log(" ");
  
        console.log(
          "Artist = " + JSON.stringify(data.tracks.items[i].album.artists[0].name)
        );
        console.log("Album:" + JSON.stringify(data.tracks.items[i].album.name));
        console.log("Song: " + JSON.stringify(data.tracks.items[i].name));
        console.log(
          "Link: " + JSON.stringify(data.tracks.items[i].external_urls.spotify)
        );
  
        console.log(" ");
        console.log(
          "================================================================="
        );
      }
    });
  }
}

console.log(spotify_this_song(operation,user_input)) 

if (operation == "movie-this") {
  var movie = process.argv.slice(3).join(" ");

  axios
    .get(
      `https://www.omdbapi.com/?t=${process.argv
        .slice(3)
        .join(" ")}&y=&plot=short&apikey=trilogy`
    )
    .then(function(response) {
      if (process.argv[3] == undefined) {
        axios
          .get(
            "https://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy"
          )
          .then(function(response) {
            console.log(
              "================================================================="
            );
            console.log(" ");

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
          });
      } else {
        console.log(
          "================================================================="
        );
        

        console.log("Title: " + response.data.Title);

        console.log("Year: " + response.data.Year);

        console.log("IMDB Rating: " + response.data.imdbRating);

        // we can't pass if statement through find so we use a in line function to pass a condition. The function can be seen as query
        // console.log('Rotten Tomatoes Rating: ' + response.data.Ratings.find(function(rating){
        //   return rating.Source == 'Rotten Tomatoes'
        // }).Value);

        //for loop to grab the Rotten Tomatoes Rating

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
      }
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
  } else if (operation == "do-what-it-says") {
    var contents = fs.readFileSync("./random.txt", "utf8");
    
    var text_input = contents.split(',')

    process.argv[2] = text_input[0]
    process.argv[3] = text_input[1]
    
  }
  