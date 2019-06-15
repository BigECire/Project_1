$(document).ready(function () {
  $("#submit").on("click", function () {

    console.log("working")

    var searchType = $(".type-of-search").val();
    var seachTerm = $(".search-term").val();
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/" + searchType + "=" + seachTerm;
    // var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list"
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      for (let i = 0; i < response.drinks.length; i++) {
        var card = $("<div>")
        card.addClass("card result-card")
        card.attr("data-id", response.drinks[i].idDrink)

        var image = $("<img>")
        image.addClass("card-img-top")
        image.attr("src", response.drinks[i].strDrinkThumb)
        image.attr("alt", response.drinks[i].strDrink + " image")
        card.append(image)

        var title = $("<h4>")
        title.addClass("card-title")
        title.text(response.drinks[i].strDrink)
        card.append(title)

        $("#results").append(card)

      }
      var URL = "https://calendarific.com/api/v2?api_key=2c0dbaf7a60237e5add4aeb4980344a79a0d269d&country=US&year=2019"
      $.ajax({
        url: URL,
        method: "GET"
      }).then(function (response) {
        console.log(response);
      })
    });
  });
  $(document).on("click", ".result-card", function () {
    console.log("clicked");

    var drinkId = $(this).attr("data-id")
    localStorage.clear();
    localStorage.setItem("Id", drinkId);
    document.location.href = "recipe_page.html"
    
    
  })

  var currentDrink = localStorage.getItem("Id")
  if(!isNaN(currentDrink)){
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
      while (ingredient !== "") {
        console.log(response["drinks"][0]["strIngredient" + i] + ": " + response["drinks"][0]["strMeasure" + i]);
        var newRow = $("<tr>").append(
          $("<td>").text(response["drinks"][0]["strIngredient" + i]),
          $("<td>").text(response["drinks"][0]["strMeasure" + i])
        );

        $("#ingredients-table").append(newRow);
        i++
        ingredient = response["drinks"][0]["strIngredient" + i]
      }

    })}
})