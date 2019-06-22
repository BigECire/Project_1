$(document).ready(function () {
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

    var favGet = database.ref("drinkData/favorites")
    var favRef = database.ref("drinkData")
    var favorites
    favGet.once('value').then(function (snapshot) {
        favorites = snapshot.val()
        console.log(favorites)
        if (favorites[0] === "fake") {
            var listRow = $("<li>")
            listRow.addClass("list-group-item")
            listRow.text("Nothing Right Now")
            $("#favorite-drinks").append(listRow)
        }
        else {
            for (var i = 0; i < favorites.length; i++) {
                var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + favorites[i]
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    var listRow = $("<li>")
                    listRow.addClass("list-group-item fav-" + response.drinks[0].idDrink)
                    listRow.text(response.drinks[0].strDrink)

                    var img = $("<img>")
                    img.attr("src", response.drinks[0].strDrinkThumb)
                    img.attr("alt", response.drinks[0].strDrink + " image")
                    img.attr("data-id", response.drinks[0].idDrink)
                    img.addClass("tiny favorites")
                    listRow.append(img)

                    var btn = $("<button>")
                    btn.addClass("btn btn-danger remove-favorites")
                    btn.attr("style", "background-color: #ae1903")
                    btn.attr("data-id", response.drinks[0].idDrink)
                    btn.text("Remove")
                    listRow.append(btn)

                    $("#favorite-drinks").append(listRow)
                })
            }
        }
    })

    var tryGet = database.ref("drinkData/toTry")
    var tryRef = database.ref("drinkData")
    var toTry
    tryGet.once('value').then(function (snapshot) {
        toTry = snapshot.val()
        console.log(toTry)
        if (toTry[0] === "fake") {
            var listRow = $("<li>")
            listRow.addClass("list-group-item")
            listRow.text("Nothing Right Now")
            $("#drinks-to-try").append(listRow)
        }
        else {
            for (var i = 0; i < toTry.length; i++) {
                var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + toTry[i]
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    var listRow = $("<li>")
                    listRow.addClass("list-group-item try-" + response.drinks[0].idDrink)
                    listRow.text(response.drinks[0].strDrink)

                    var img = $("<img>")
                    img.attr("src", response.drinks[0].strDrinkThumb)
                    img.attr("alt", response.drinks[0].strDrink + " image")
                    img.attr("data-id", response.drinks[0].idDrink)
                    img.addClass("tiny toTry")
                    listRow.append(img)

                    var btn = $("<button>")
                    btn.addClass("btn btn-danger remove-toTry")
                    btn.attr("style", "background-color: #ae1903")
                    btn.attr("data-id", response.drinks[0].idDrink)
                    btn.text("Remove")
                    listRow.append(btn)


                    $("#drinks-to-try").append(listRow)
                })
            }
        }
    })

    $(document).on("click", ".favorites", function () {
        console.log("clicked");

        var drinkId = $(this).attr("data-id")
        localStorage.clear();
        localStorage.setItem("Id", drinkId);
        document.location.href = "recipe_page.html"
    })

    $(document).on("click", ".toTry", function () {
        console.log("clicked");

        var drinkId = $(this).attr("data-id")
        localStorage.clear();
        localStorage.setItem("Id", drinkId);
        document.location.href = "recipe_page.html"
    })

    $(document).on("click", ".remove-favorites", function () {
        console.log("clicked");

        var drinkId = $(this).attr("data-id")
        favGet.once('value').then(function (snapshot) {
            var favorites = snapshot.val()
            console.log(favorites)
            var here = favorites.indexOf(drinkId)
            favorites.splice(here, 1)
            console.log(favorites.length)
            if (favorites.length === 0) {
                favorites = ["fake"]
            }
            favRef.child("favorites").set(favorites)
            console.log(favorites)

            $(".fav-" + drinkId).remove();
        })
    })

    $(document).on("click", ".remove-toTry", function () {
        console.log("clicked");

        var drinkId = $(this).attr("data-id")
        tryGet.once('value').then(function (snapshot) {
            var toTry = snapshot.val()
            console.log(toTry)
            var here = toTry.indexOf(drinkId)
            toTry.splice(here, 1)
            console.log(toTry.length)
            if (toTry.length === 0) {
                toTry = ["fake"]
            }
            tryRef.child("toTry").set(toTry)
            console.log(toTry)

            $(".try-" + drinkId).remove();
        })
    })

    console.log("w")

})