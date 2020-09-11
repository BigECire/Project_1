$(document).ready(function () {
    var currentDrink = localStorage.getItem("Id")
    if (!isNaN(currentDrink)) {
        var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + localStorage.getItem("Id")
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            console.log(response.drinks[0].strDrink);
            $("#recipe-name").text(response.drinks[0].strDrink)
            console.log(response.drinks[0].strDrinkThumb);
            $("#recipe-img").attr("src", response.drinks[0].strDrinkThumb)
            console.log(response.drinks[0].strInstructions);
            $("#recipe-instructions").text(response.drinks[0].strInstructions)
            var ingredient = response.drinks[0].strIngredient1
            var i = 1
            while (ingredient !== null) {
                console.log(response["drinks"][0]["strIngredient" + i] + ": " + response["drinks"][0]["strMeasure" + i]);
                var newRow = $("<tr>").append(
                    $("<td>").text(response["drinks"][0]["strIngredient" + i]),
                    $("<td>").text(response["drinks"][0]["strMeasure" + i])
                );

                $("#ingredients-table").append(newRow);
                i++
                ingredient = response["drinks"][0]["strIngredient" + i]
            }

        })
    }
    var firebaseConfig = {
        apiKey: "AIzaSyAwm3an_SCy28O5q45B80DdKc0NDmXC-9k",
        authDomain: "time-for-a-drink.firebaseapp.com",
        databaseURL: "https://time-for-a-drink.firebaseio.com",
        projectId: "time-for-a-drink",
        storageBucket: "time-for-a-drink.appspot.com",
        messagingSenderId: "549694223569",
        appId: "1:549694223569:web:17b82da5b0a4183a"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    $("#favorites-btn").on("click", function () {
        console.log("hi")
        var favGet = database.ref("drinkData/favorites")
        var favRef = database.ref("drinkData")
        var favorites
        favGet.once('value').then(function (snapshot) {
            favorites = snapshot.val()
            console.log(favorites)
            if (favorites[0] === "fake"){
                favorites = []
            }

            var repeatCheck = favorites.indexOf(localStorage.getItem("Id"))

            if (repeatCheck === -1){
                favorites.push(localStorage.getItem("Id"))
                favRef.child("favorites").set(favorites)
            }
            console.log(favorites)
        })
    })
    $("#try-btn").on("click", function () {
        console.log("hi")
        var tryGet = database.ref("drinkData/toTry")
        var tryRef = database.ref("drinkData")
        var toTry
        tryGet.once('value').then(function (snapshot) {
            toTry = snapshot.val()
            console.log(toTry)
            if (toTry[0] === "fake"){
                toTry = []
            }

            var repeatCheck = toTry.indexOf(localStorage.getItem("Id"))

            if (repeatCheck === -1){
                toTry.push(localStorage.getItem("Id"))
                tryRef.child("toTry").set(toTry)
            }
            console.log(toTry)
        })
    })
})