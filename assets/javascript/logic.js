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
    });
  });
  $(document).on("click", ".result-card", function () {
    console.log("clicked");
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + $(this).attr("data-id")
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
    })
  })
})