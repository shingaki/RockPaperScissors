
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAkMx249jAwJgv06NtxWSDFE51AZaqIsyc",
    authDomain: "rockpaperscissorsa.firebaseapp.com",
    databaseURL: "https://rockpaperscissorsa.firebaseio.com",
    projectId: "rockpaperscissorsa",
    storageBucket: "rockpaperscissorsa.appspot.com",
    messagingSenderId: "198773386942"
};

firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database(); // pointer to datbase

$( document ).ready(function() {


    console.log("load javascript");

    $("#set-player-profile").hide();

    $("#player-status-button").on("click", function () {
        event.preventDefault();
        console.log("player-button-clicked");

        if ($('input[name=player-type]:checked').length > 0) {
            console.log("radio button is checked");
            var playerStatusSelected = getRadioButtonValue(document.getElementById('get-player-status'), "player-type");
            console.log("player status selected = " + playerStatusSelected);
            if (playerStatusSelected === "new-player") {
                hideMyForm();
                showProfileForNewPlayer();
            } else if
                (playerStatusSelected === "existing-player") {
                    console.log("logic for existing player goes here");
            }
        } else
            console.log("please indicate if you are an existing player or a new player");
    })

    function hideMyForm() {
        console.log("hide my Form");
        $("#get-player-status").hide();
    }

    function showProfileForNewPlayer() {
        console.log("showProfileForNewPlayer");
        $("#set-player-profile").show();




    }

    function getRadioButtonValue(form, name) {
        var val;
        // get list of radio buttons with specified name
        var radios = form.elements[name];

        // loop through list of radio buttons
        for (var i=0, len=radios.length; i<len; i++) {
            if ( radios[i].checked ) { // radio checked?
                val = radios[i].value; // if so, hold its value in val
                break; // and break out of for loop
            }
        }
        return val; // return value of checked radio or undefined if none checked
    }

    $("#set-player-button").on("click", function(event) {
        event.preventDefault();

        var playerName = $("#player-name-input").val().trim();
        var first = $("#player-first-name-input").val().trim();
        var last = $("#player-last-name-input").val().trim();
        var wins = 0;
        var losses = 0;

        console.log(playerName);
        console.log(first);
        console.log(last);


        database.ref().push({
            player: playerName,
            firstName: first,
            lastName: last,
            gamesWon: wins,
            gamesLosses: losses
        });

    });
});
