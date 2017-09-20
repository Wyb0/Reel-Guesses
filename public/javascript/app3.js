jQuery(($) => {
    
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAC81YemgvKLvGMDq1pUo-e7OS8LmbPOT8",
        authDomain: "reel-guesses.firebaseapp.com",
        databaseURL: "https://reel-guesses.firebaseio.com",
        projectId: "reel-guesses",
        storageBucket: "reel-guesses.appspot.com",
        messagingSenderId: "27036367195"
    };
    
    //initializing firebase
    firebase.initializeApp(config)
    
    //setting the var database as a reference to firebase.database(); 
    var database = firebase.database();
    
    //setting the var connectionsRef to the path for /connections, all the connections data will be stored in this dir
    var connectionsRef = database.ref('/connections');
    
    //creating the var connectedRef to reference the .info/connected path that updates with each connection state change
    var connectedRef = database.ref('.info/connected');
    
    //setting the .on('value') event listener to the reference for .info/connected so snap updates with each update in the connection state
    connectedRef.on('value', snap => {
        
    //if the client is connected, .info/connected registers a state change that is heard by .on(value) which updates snap's.val()
    //and snap.val() is thus true
    if(snap.val()) {
    
        //when true or when client is connected, add user to /connections list
        var ucon = connectionsRef.push(true);
    
        //onDisconnect() take user off /conections list
        ucon.onDisconnect().remove();
    
        }
    });
    //on load up and w/ each state change in the /connections list grab a data snap
    connectionsRef.on('value', snap => {
    
        //display the data snap in the app html -- numChildren is the number of players in /connections
        $('#playerPop').html(snap.numChildren());
    });
    
    //////////////////////////////////// end of initial database code ////////////////////////////////////////////////////////////////////////
    
    //////// start of film info code ////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    //setting the var movies to hold the array of 100 films
    var movies = ["Bill %26 Ted's Excellent Adventure",
            "White Chicks",
            "Pulp Fiction",
            "Titanic",
            "Scarface",
            "Indiana Jones and the Temple of Doom",
            "Goodfellas",
            "The Silence of the Lambs",
            "Clueless",
            "Forrest Gump",
            "Drive",
            "Sin City",
            "Oliver %26 Company",
            "Grown Ups",
            "The Matrix",
            "Saving Private Ryan",
            "Get Out",
            "Fight Club",
            "Reservoir Dogs",
            "The Shining",
            "Pocahontas",
            "Requiem for a Dream",
            "Training Day",
            "Donnie Darko",
            "The Mummy",
            "Eternal Sunshine of the Spotless Mind",
            "The Dark Knight Rises",
            "The Departed",
            "V for Vendetta",
            "Avatar",
            "Moana",
            "Inception",
            "Twilight",
            "Shutter Island",
            "Batman %26 Robin",
            "Happy Gilmore",
            "Clerks",
            "Back to the Future",
            "The Breakfast Club",
            "Rocky",
            "Jerry Maguire",
            "Nightcrawler",
            "True Romance",
            "The Sixth Sense",
            "Dazed and Confused",
            "The Hangover",
            "Old School",
            "Interstellar",
            "Pirates of the Caribbean: On Stranger Tides",
            "The Godfather Part III",
            "Superman Returns",
            "Saw",
            "Snakes on a Plane",
            "Strange Wilderness",
            "It Follows",
            "Trick ‘r Treat",
            "Lady in the Water",
            "Biodome",
            "Spider-man 3",
            "Black Swan",
            "Transformers",
            "Guardians of the Galaxy",
            "Toy Story",
            "Kill Bill: Vol. 1",
            "Minions",
            "Popstar: Never Stop Never Stopping",
            "Hot Rod",
            "Max Steel",
            "Home Alone",
            "The Notebook",
            "The Circle",
            "Kong: Skull Island",
            "Kingsman: The Secret Service",
            "Kick-Ass",
            "Jaws",
            "The Rocky Horror Picture Show",
            "White Men Can’t Jump",
            "Con Air",
            "The Room",
            "Big Daddy",
            "Kung Pow: Enter the Fist",
            "Kung Fu Hustle",
            "Sucker Punch",
            "The Wicker Man",
            "The Mighty Ducks",
            "Signs",
            "I Am Legend",
            "Resident Evil",
            "X-Men: First Class",
            "Hancock",
            "Hulk",
            "Watchmen",
            "Evil Dead",
            "Anchorman: The Legend of Ron Burgundy",
            "Forgetting Sarah Marshall",
            "I Love You, Man",
            "Night at the Museum",
            "Star Wars: Episode II – Attack of the Clones",
            "Star Wars: Episode III – Revenge of the Sith",
            "Star Wars: Episode VII – The Force Awakens"
            ];
    
    //setting the var film to grab a randomly selected movie from the array of movies
    var film = movies[Math.floor(Math.random() * movies.length)];
    
    //logging film to test we're getting proper results
    console.log(film);
    

// taking chosen movie and adding "trailer" to search result
var title = film + "trailer"
//url pulling from googles API search list - adding title - adding API key

var queryURL = "https://cors-bcs.herokuapp.com/https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + title + "&key=AIzaSyAVmdAqqHKsMcIgJ01XXz3NrNnBqEP2Jjs"

// Ajax request to pull youtube video
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
 console.log(response);            
console.log(response.items[0].id.videoId);
//replacing video src with trailers video ID
$("#video").attr("src", ("https://www.youtube.com/embed/" + response.items[0].id.videoId))

});

//making var for youtube click counter
var youtubeClick = 0;

  $(document).on("click", "#video", () => {

      //increases click counter
      youtubeClick++;
                
      //saving the value of youtubeClick in firebase
      database.ref("/trailerClicks").set({
          youtubeClicked: youtubeClick
      })
  });
   
  //database ref to save on click snapshot to incremently add updated click count w/o erasing
  database.ref('/trailerClicks').on('value', function(snap) {
      console.log(snap.val());

      youtubeClick = snap.val().youtubeClicked;
  });

    //setting the var movieStars to an empty array, which will hold the list of actors from the randomly selected film
    var movieStars = [];
    
    //function to generate the ajax request and utilize the response (i.e. pull movies) pull the film OMDB API
    function pullFilm() {
    
        //setting the var queryURL to hold the query for OMDB's API and the interpolated var film to dynamically create the full API call 
        var queryURL = "https://www.omdbapi.com/?t=" + film + "&y=&plot=short&apikey=be1e25b8";
    
        //the ajax request with url and "GET" method that is calling the OMDB api for the randomly selected film's DVD/BR to purchase
        $.ajax({
            url: queryURL,
            method: "GET"
    
            //setting the .done function to receive the repo
        }).done( repo => {
            console.log(repo);
    
            //creating the var filmDiv to hold a dynamic div with class .films which in turn holds the randomly selected film
            var filmDiv = $('<div>').addClass('films');

            //creating var for title of movie
            var title = repo.Title
    
            //grabbing the ratings from the repo object path with the var rating
            //var rating = repo.Rated;
    
            //creating the var rated to hold a dynamic paragraph which contains the ratings 
            //var rated = $('<p>').html('Rated: ' + rating);
    
            //appending the rated var to the dynamic div with class .films
            //filmDiv.append(rated);
    
////
 //creating the var rated to hold a dynamic paragraph which contains the ratings 
            var question = $('<p>').html('What is the score of ' + title)
                .attr("id", "score");
         //appending the rated var to the dynamic div with class .films
         filmDiv.append(question);

        var answer = $('<form>');
        var input = $("<input>").attr("type", "text");
        answer.append(input);
        var input2 = $("<button>").attr("type", "submit").text('submit');
        answer.append(input2);
        question.append(answer);
        event.preventDefault();
////


            //grabing the url for the poster & sticking it in the var poster
            var poster = repo.Poster;
    
            //dynamically creating an image element to hold the poster and wrapping it in the var image
            var image = $('<img>').attr('src', poster);
    
            //appending the image to the dynamically created filmDiv
            filmDiv.append(image);
    
            //grabbing the release date and storing it in the var released
            //var released = repo.Released; *edited out for year only
            var released = repo.Year
    
            //dynamically creating a paragraph element to hold the release date and sticking it in the var release
            var release = $('<p>').html(title + ' ' + '(' + released + ')');
    
            //appending the var release (i.e. the html element) to the filmDiv
            filmDiv.append(release);
    
            //grabbing the list of main actors in the film and storing it in the var actors
            var actors = repo.Actors;
    
            //grabbing a reference path/node from the real time database to store the list of actors in for later use in another function, which would otherwise violate scope and not be possible
            database.ref('/filmStars').set({
                stars: actors
            });
    
            //dynamically creating a paragraph element to hold the list of actors and wrapping it with the var players
            //var players = $('<p>').html('Starring: ' + actors);
    
            //appending the var players (i.e. html element) to the filmDiv
            //filmDiv.append(players);
    
            //grabbing the plot synopsis and storing it in the var story
            //var story = repo.Plot;
    
            //dynamically creating a paragraph element to hold the var story and sticking it into the var plot
            //var plot = $('<p>').html('Synopsis: ' + story);
    
            //appending the plot var (i.e. paragraph element containing the plot) to the filmDiv
            //filmDiv.append(plot);
            
            var rotTom = repo.Ratings[1].Value

            database.ref('/criticRanking').set({
                rotScore: rotTom
            });
            
            var criticRate = $('<p>').html('Critic Rating: ' + rotTom);
            
            filmDiv.append(criticRate);

            //appending the dynamic div - filmDiv - to the hard coded html div with id film-view and thus displaying the rating, poster, release date, actors, and synopsis
            $('#film-view').prepend(filmDiv);
        })
    }
    
    //calling our pullFIlm function
    pullFilm();
    
    ////////////////////////////////////////////////////////// end of film info code area //////////////////////////////////////////////
    
    /////////////////////// start of the star biography code area//////////////////////////////////////////////////////////////////////
    
    //on page load and data state changes, store an account of the data state at the node /filmStars in the var snap
    database.ref('/filmStars').on('value', snap => {
    
        //log the .val();ue of snap
        console.log(snap.val());
    
        //used the database node /filmStars to save the list of main actors from each film through the object path of the omdb api above and .push(); each name to the object held by the var movieStars below
        movieStars.push((snap.val().stars.split(',')));
        console.log(movieStars);
    
        //function to create movieStar buttons
        function makeButtons() {
    
            //deletes the #starButtons div each time a new movieStars array is added, preventing repeat/lingering buttons 
            $('#starButtons').empty();
    
            //for loop that itterates through the entire array, rendering a button for each index of the array
            for (var i = 0; i < movieStars[0].length; i++) {
                console.log("first", movieStars[0][i]);
    
                //dynamically creating a button through JQuery (with css styling to prevent each button from touching one another)
                var $btn = $('<button>').css({ "margin": "5px 5px" });
                console.log("second", $btn);
    
                //adding the class="stars" to the newly dynamically created buttons
                $btn.addClass('stars');
                console.log("third", $btn);
    
                //adding the data-name attribute to the buttons
                $btn.attr('data-name', movieStars[0][i]);
                console.log("forth", $btn);
    
                //gives each button a text lable matching the text of the element in the array
                $btn.text(movieStars[0][i]);
                console.log('fifth', $btn);
    
                //locates each button in the div with the id="starButtons"
                $('#starButtons').append($btn);
                console.log("sixth", $btn);
            }
        };
    
        //calling the makeButtons() function to generate our star buttons for each film
        makeButtons();
    
        //error logging function that
    }, errorObject => {
    
        //logs errors to the console
        console.log('The read failed: ' + errorObject.code);
    });
    
    //function to generate the ajax request and utilize the response from  Wikipedia's API (i.e. pull the star bios)
    function pullBio() {
    
        //creating the var movieStar to hold the name clicked on and subsequently interpolate into the queryURL var, completing the ajax request
        var movieStar = $(this).attr('data-name')
    
        //setting the var queryURL2 to hold the query for Wikipedia's API and the interpolated var movieStar to dynamically create the full API call
        var queryURL2 = "https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=" + movieStar + "&limit=1";
    
        //creating a jQuery ajax call to Wikipedia's api for the specific actor/actress with the "GET" method
        $.ajax({
            url: queryURL2,
            method: "GET"
    
            //setting the .done function to receive the response
        }).done( repo2 => {
            
            //added empty to clear button event after click
            $(".star").empty();

            //creating a var starDiv to hold the dynamically created html div w/ class="star"
            var starDiv = $('<div class="star">');
    
            //setting the var starBio to the path for the star's biography, ultimately setting starBio to hold the star's biography
            var starBio = repo2[2][0];
    
            //creating the var bioP to hold a dynamically created html paragraph element chained with the .text(); function to add the label Star Biography as well as the concatenated var starBio (and it's value - the star's biography)
            var bioP = $('<p>').text("Bio: " + starBio);
    
            //appending the var bioP to the var starDiv
            starDiv.append(bioP);
    
            //append the var starDiv to the html div element with the id="movieStar"
            $('#starButtons').append(starDiv);
        });
    };
    
    //using the document on click event listener to display the star bio on the page when a star button is clicked
    $(document).on('click', '.stars', pullBio);
    
    //initializing click counter for the starBio buttons, to see if it's a popular feature
    var starClicker = 0;
    
    //when a user clicks a button with class stars
    $(document).on('click', 'button.stars', () => {
    
        //increase the starClicker
        starClicker++;
    
        //save the new value to firebase in JSON property "starClicked" 
        database.ref('/starClicks').set({
            starClicked: starClicker
        });
    
        //logging the value of starClicker
        console.log(starClicker);
    });
    
    //on load up & w/ each state/value change at /starClicks get a data snapshot
    database.ref('/starClicks').on('value', snapshot => {
    
        //log the local value of the snapshot to the console
        console.log(snapshot.val());
    
        //changing the var starClicker to reflect the local value in firebase
        starClicker = snapshot.val().starClicked;
    
        //logging the value of starClicker to test code above
        console.log(starClicker);
    
        //logging the local value from firebase to test above code & get the number of /starClicks
        console.log(snapshot.val().starClicked);
    
        //error logging function that...
    }, errorObject => {
    
        //logs errors to the console
        console.log('The read failed: ', errorObject.code);
    });
    
    /////////////////////////// end of star biography code///////////////////////////////////////////////////////////////////////////
    
    ///////////////////////////////////////////////////// start of shopping code ////////////////////////////////////////////////////
    
    //setting the var $dvdBrDiv to hold the dynamically created div with class="disc" and font-size .8rem
    var $dvdBrDiv = $('<div>').addClass("disc").css({ "font-size": "0.85rem" });
    
    //for (var j = 0; j < films.length; j++) {
        //created the var queryURL3 to hold the url for the ajax request which waits for the var film generated by the random selecter to concatenate completing the url and consequently the ajax request 
        var queryURL3 = "https://cors-bcs.herokuapp.com/https://api.walmartlabs.com/v1/search?apikey=bazr3m8sdwbcyg57sjkm8ake&categoryId=4096&numItems=1&responseGroup=full&query=" + film + "movie";
    
        //the ajax request with url and "GET" method that is calling the Walmart api for the randomly selected film's DVD/BR to purchase
        $.ajax({
            url: queryURL3,
            method: "GET"
    
            //the .done function that is being looped through for each array intem held by the var films
        }).done( repo3 => {
            console.log(repo3);
    
            //setting the var caseArt to hold the path to each dvd/blue-ray image
            var caseArt = repo3.items[0].imageEntities[0].largeImage;
    
            //setting the var $caseImage to hold the dynamically created html image element with the src attribute set to the var caseArt
            var $caseImage = $('<br><img>').attr("src", caseArt);
    
            //appending the var $caseImage to the var $dvdBrDiv which holds the dynamically created div, ultimately putting a dynamically created html image into a dynamically created html div
            $dvdBrDiv.append($caseImage);
    
            //setting the var name to hold the path to each dvd/blue-ray title
            var name = repo3.items[0].name;
    
            //creating the var $title to hold a dynamically created html paragraph element with text of each dvd/blue-ray title
            var $title = $('<p>').text(name);
    
            //appending the var $title to the var $dvdBrDiv which holds the dynamic div, again putting a dynamically created html paragraph into a dynamically created html div
            $dvdBrDiv.append($title);
    
            //setting the var cost to hold the path to each dvd/blue-ray price
            var cost = repo3.items[0].salePrice;
    
            //created the var $price to hold a dynamically created html paragraph element with text of each dvd/blue-ray price
            var $price = $('<p>').text("Walmart price $" + cost);
    
            //appending the var $price to the var $dvdBrDiv which holds the dynamic div, again putting a dynamically created html element into another dynamically created html div element
            $dvdBrDiv.append($price);
    
            //setting the var addtoCart to hold the path to the walmart shopping cart checkout/purchase screen for each dvd/blue-ray 
            var addtoCart = repo3.items[0].addToCartUrl;
    
            //created the var $cart to hold a dynamically created html anchor element with the href attribute hyper linking the dvd/blue-ray, the app, and walmart's shopping cart checkout/purchase screen
            var $cart = $('<a>').attr("href", addtoCart).attr("target", "_blank").text("Add To Cart");
    
            //appending the var $cart with the dynamically created html anchor element to the var $dvdBrDiv which holds the dynamic div, again putting a dynamically created html anchor element into a dynamically created html div element
            $dvdBrDiv.append($cart);
    
            //prepending the var $dvdBrDiv to the div with the id="filmCase"
            $('#filmCase').prepend($dvdBrDiv);
        });

      //making var for shopping click counter
      var shoppingClick = 0;
      
        $(document).on("click", "#filmCase", () => {
      
            //increases click counter
            shoppingClick++;
                      
            //saving the value of shoppingClick in firebase
            database.ref("/shoppingClicks").set({
                shoppingClicked: shoppingClick
            })
        });
         
        //database ref to save on click snapshot to incremently add updated click count w/o erasing
        database.ref('/shoppingClicks').on('value', function(snap) {
            console.log(snap.val());

        shoppingClick = snap.val().shoppingClicked;
        });
    //};
    });
    /////////////////////////// end of shopping code area//////////////////////////////////////////////////////////////////////////////
    