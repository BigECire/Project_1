$(document).ready(function () {
    var currentDrink = localStorage.getItem("Id")
    if (!isNaN(currentDrink)) {
        var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + localStorage.getItem("Id")
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            $("#item-img").attr("src", response.drinks[0].strDrinkThumb)
            var ingredient = response.drinks[0].strIngredient1
            var i = 1
            while (ingredient !== "") {
                var newRow = $("<tr>").append(
                    $("<td>").text(response["drinks"][0]["strIngredient" + i]),
                    $("<td>").text("Na")
                );

                $("#shopping-list-table").append(newRow);
                i++
                ingredient = response["drinks"][0]["strIngredient" + i]
            }

        })
    }
})