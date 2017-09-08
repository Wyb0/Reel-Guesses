$(document).ready(function() {

    var movies = ["Bill and Ted’s Excellent Adventure",
        "White Chicks",
        "Pulp Fiction",
        "Titanic",
        "Scarface",
        "Indiana Jones and the Temple of Doom",
        "Goodfellas",
        "Silence of the Lambs",
        "Clueless",
        "Forrest Gump",
        "Drive",
        "Sin City",
        "Oliver & Company",
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
        "Batman & Robin",
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
        "The Godfather III",
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



//need a function to extract the list of main acotrs/actresses from each film through the object path and .push();
//each name to the array held by the var movieStars


//setting the var movieStar to hold the array of actor's/actress's names from the film
var movieStars = ["Hugo Weaving"]; //"xpathFromOMBDapiRequest";
//function to generate the ajax request to and utilize the response from (i.e. pull star bio's) Wikipedia's API
function pullBio() {
    //creating the var movieStar to hold the name clicked on and subsequently interpolate into the queryURL var, completing the ajax request
    var movieStar = "Hugo Weaving";    //$(this).attr('name')
    //setting the var queryURL to hold the query for Wikipedia's API and the interpolated var movieStar to dynamically create the full API call
    var queryURL = "https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=" + movieStar + "&limit=1";
    //creating a jQuery ajax call for the specific actor/actress with the "GET" method
    $.ajax({
        url: queryURL,
        method: "GET"
        //setting the .done function to receive the response
    }).done(function(response){
    console.log(response);
    //creating a var starDiv to hold the dynamically created html div w/ class="star"
    var starDiv = $('<div class="star">');
    //setting the var starBio to the path for the star's biography, ultimately setting starBio to hold the star's biography
    var starBio = response[2]["0"];
        //creating the var bioP to hold a dynamically created html paragraph element chained with the .text(); function to add the label Star Biography as well as the concatenated var starBio (and it's value - the star's biography)
        var bioP = $('<p>').text('Star Biography: ' + starBio);
        //appending the var bioP to the var starDiv
        starDiv.append(bioP);
        //append the var starDiv to the html div element with the id="movieStar"
        $('#movieStar').append(starDiv);
});
};
pullBio();

});