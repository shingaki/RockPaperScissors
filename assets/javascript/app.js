
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

    var newPlayer = false;
    var existingPlayer = false;
    var playerOneSet = false;
    var playerTwoSet = false;
    var isGameReadyToStart;


    console.log("load javascript");

    $("#set-player-profile").hide();

    $("#player-status-button").on("click", function () {
        event.preventDefault();
        console.log("player-button-clicked");

        if ($('input[name=player-type]:checked').length > 0) {
            var playerStatusSelected = getRadioButtonValue(document.getElementById('get-player-status'), "player-type");
            console.log("player status selected = " + playerStatusSelected);
            if (playerStatusSelected === "new-player") {
                newPlayer= true;
                hideMyForm();
                showProfileForNewPlayer();
            } else if
                (playerStatusSelected === "existing-player") {
                    console.log("logic for existing player goes here");
                    hideMyForm();
                    showProfileForExistingPlayer();
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

        newPlayer = true;

        $("#set-player-profile").show();
        if (!playerOneSet) {
            playerOneSet = true; }
        else {
            ( playerTwoSet = true ); }

        isGameReadyToStart = checkIfPlayersHaveBeenSelected();

        console.log(isGameReadyToStart);
        console.log(playerTwoSet);
        console.log(playerOneSet);

        if ( (playerOneSet) || (playerTwoSet) )
        {
            $("#player-entrance").text("Player Two");

        };



    }

    function showProfileForExistingPlayer() {
        console.log("showProfileForExistingPlayer");
        $("#set-player-profile").show();
        $("#player-name-label").replaceWith("Enter your player name");
        $("#set-player-button").attr("value", "OK");
        $("#player-first-name-input").hide();
        $("#player-last-name-input").hide();
        $("#last-name-label").hide();
        $("#first-name-label").hide();

        if ( (playerOneSet) || (playerTwoSet) )
        {
            $("#player-entrance").text("Player Two");

        };

        if (!playerOneSet) {
            playerOneSet = true; }
        else {
            ( playerTwoSet = true); }

        isGameReadyToStart = checkIfPlayersHaveBeenSelected();

        console.log("Game Ready - " + isGameReadyToStart);
        console.log(playerTwoSet);
        console.log(playerOneSet);



    }

    function checkIfPlayersHaveBeenSelected() {

        var gameReady = false;

        if ( (playerOneSet) && (playerTwoSet) )
        {
            console.log("Both Players Have Been Captured - Start Game");
            gameReady = true;
        }

        return gameReady;
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

        var playerName;

        if (newPlayer === true) {

            newPlayer = false;

            playerName = $("#player-name-input").val().trim();
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

            if (!isGameReadyToStart)
            {
                console.log("Game Is Not Ready To Start");
                $("#player-entrance").text("Player Two");
                $("#get-player-status").show();
                $("#set-player-profile").hide();

            }
        } else
        {
            console.log("existing player see if it is in the database");
            var playerFoundCount = 0;

            playerName = $("#player-name-input").val().trim();

            var query = firebase.database().ref().orderByKey();

            query.once("value")
                .then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {

                        var key = childSnapshot.key;

                        var childData = childSnapshot.val();
                        console.log(childData);

                        var dBplayerName = childData.player;

                        console.log("database name " + dBplayerName);

                        if (dBplayerName === playerName) {
                            playerFoundCount = playerFoundCount + 1;
                            console.log("player Found");
                            console.log("count = " + playerFoundCount);
                        }
                    })
                })

            console.log("count = " + playerFoundCount);
        }

    });
});
