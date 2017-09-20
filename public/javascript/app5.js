$(document).ready(function(){
    
    var database = firebase.database();

    database.ref('/criticRanking').on('value', function(snap) {
        console.log(snap.val());

    var rottenScore = snap.val().rotScore
        console.log(rottenScore)
    })
    
    errorObject => { 

    };
});