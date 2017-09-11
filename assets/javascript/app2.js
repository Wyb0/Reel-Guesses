$(document).ready(function(){
//need a function to extract the list of main acotrs/actresses from each film through the object path of the omdb api and .push();
//each name to the array held by the var movieStars below

//////////////////////the function would go here -- below is the star biography code area////////////////////////////////////

//setting the var movieStar to hold the array of actor's/actress's names from the film
var movieStars = ["Hugo Weaving", "Brad Pitt", "Jeremy Rener", "Samuel L. Jackson", "Leonardo Dicaprio"];  //this array is set up as a test 
//function to generate the ajax request to and utilize the response from (i.e. pull star bio's) Wikipedia's API
function pullBio() {
    //creating the var movieStar to hold the name clicked on and subsequently interpolate into the queryURL var, completing the ajax request
    var movieStar = $(this).attr('data-name')
    //setting the var queryURL to hold the query for Wikipedia's API and the interpolated var movieStar to dynamically create the full API call
    var queryURL2 = "https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=" + movieStar + "&limit=1";
    //creating a jQuery ajax call for the specific actor/actress with the "GET" method
    $.ajax({
        url: queryURL2,
        method: "GET"
        //setting the .done function to receive the response
    }).done(function (response) {
        //creating a var starDiv to hold the dynamically created html div w/ class="star"
        var starDiv = $('<div class="star">');
        //setting the var starBio to the path for the star's biography, ultimately setting starBio to hold the star's biography
        var starBio = response[2][0];
        //creating the var bioP to hold a dynamically created html paragraph element chained with the .text(); function to add the label Star Biography as well as the concatenated var starBio (and it's value - the star's biography)
        var bioP = $('<p>').text("Star Biography: " + starBio);
        //appending the var bioP to the var starDiv
        starDiv.append(bioP);
        //append the var starDiv to the html div element with the id="movieStar"
        $('#movieStar').prepend(starDiv);
    });
};
//function to create movieStar buttons
function makeButtons() {
    //deletes the #starButtons div each time a new movieStars array is added, preventing repeat/lingering buttons 
    $('#starButtons').empty();
    //for loop that itterates through the entire array, rendering a button for each index of the array
    for (var i = 0; i < movieStars.length; i++) {
        console.log("first", movieStars[i]);
        //dynamically creating a button through JQuery (with css styling to prevent each button from touching one another)
        var $btn = $('<button>').css({ "margin": "5px 5px" });
        console.log("second", $btn);
        //adding the class="stars" to the newly dynamically created buttons
        $btn.addClass('stars');
        console.log("third", $btn);
        //adding the data-name attribute to the buttons
        $btn.attr('data-name', movieStars[i]);
        console.log("forth", $btn);
        //gives each button a text lable matching the text of the element in the array
        $btn.text(movieStars[i]);
        console.log('fifth', $btn);
        //locates each button in the div with the id="starButtons"
        $('#starButtons').append($btn);
        console.log("sixth", $btn);
    }
};
//using the document on click event listener to display the star bio on the page when a star button is clicked
$(document).on('click', '.stars', pullBio);

makeButtons();
/////////////////////////// end of star biography code///////////////////////////////////////////////////////////////////////////

///need a function to .push(); the array of 5 films from each round to the var films array below -- this is the shopping area code///


//creating the var films to hold the array of items/films pushed from the omdb api
var films = ["Pulp Fiction", "Clueless", "Fight Club", "The Matrix", "Titanic"];
//setting the var $dvdBrDiv to hold the dynamically created div with class="disc" and font-size .8rem
var $dvdBrDiv = $('<div>').addClass("disc").css({ "font-size": "0.8rem" });
//for loop that instantaneously itterates several ajax requests, one for each index in the array held by the var films
for (var j = 0; j < films.length; j++) {
    //created the var queryURL3 to hold the url for the ajax request which waits for each item in the var films to concatenate by way of the for loop and complete the url and consequently the ajax request 
    var queryURL3 = "https://api.walmartlabs.com/v1/search?apikey=bazr3m8sdwbcyg57sjkm8ake&numItems=1&responseGroup=full&query=" + films[j];
    //the ajax request with url and method "GET" that is being looped through for each item in the array held by the var films
    $.ajax({
        url: queryURL3,
        method: "GET"
        //the .done function that is being looped through for each array intem held by the var films
    }).done(function (response) {
        console.log(response);
        //setting the var caseArt to hold the path to each dvd/blue-ray image
        var caseArt = response.items[0].imageEntities[1].thumbnailImage;
        //setting the var $caseImage to hold the dynamically created html image element with the src attribute set to the var caseArt
        var $caseImage = $('<br><img>').attr("src", caseArt);
        //appending the var $caseImage to the var $dvdBrDiv which holds the dynamically created div, ultimately putting a dynamically created html image into a dynamically created html div
        $dvdBrDiv.append($caseImage);
        //setting the var name to hold the path to each dvd/blue-ray title
        var name = response.items[0].name;
        //creating the var $title to hold a dynamically created html paragraph element with text of each dvd/blue-ray title
        var $title = $('<p>').text(name);
        //appending the var $title to the var $dvdBrDiv which holds the dynamic div, again putting a dynamically created html paragraph into a dynamically created html div
        $dvdBrDiv.append($title);
        //setting the var cost to hold the path to each dvd/blue-ray price
        var cost = response.items[0].salePrice;
        //created the var $price to hold a dynamically created html paragraph element with text of each dvd/blue-ray price
        var $price = $('<p>').text("Walmart price $" + cost);
        //appending the var $price to the var $dvdBrDiv which holds the dynamic div, again putting a dynamically created html element into another dynamically created html div element
        $dvdBrDiv.append($price);
        //setting the var addtoCart to hold the path to the walmart shopping cart checkout/purchase screen for each dvd/blue-ray 
        var addtoCart = response.items[0].addToCartUrl;
        //created the var $cart to hold a dynamically created html anchor element with the href attribute hyper linking the dvd/blue-ray, the app, and walmart's shopping cart checkout/purchase screen
        var $cart = $('<a>').attr("href", addtoCart).attr("target", "_blank").text("Add To Cart");
        //appending the var $cart with the dynamically created html anchor element to the var $dvdBrDiv which holds the dynamic div, again putting a dynamically created html anchor element into a dynamically created html div element
        $dvdBrDiv.append($cart);
        //prepending the var $dvdBrDiv to the div with the id="filmCase"
        $('#filmCase').prepend($dvdBrDiv);
    });
};
});
/////////////////////////// end of shopping code area//////////////////////////////////////////////////////////////////////////////
