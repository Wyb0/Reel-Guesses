$(document).ready(function() {
    
////
 //creating the var rated to hold a dynamic paragraph which contains the ratings 
 var question = $('<p>').html('What is the score of' + title)
 .attr("id", "score");
//appending the rated var to the dynamic div with class .films
filmDiv.append(question);
////

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
    });