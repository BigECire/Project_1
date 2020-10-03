$(document).ready(function () {
  $("#submit").on("click", function () {

    var searchType = $(".type-of-search").val();
    var seachTerm = $(".search-term").val();
    if ( searchType == "Choose..." ) { 
      return; 
    }
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/" + searchType + "=" + seachTerm;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      $("#results").empty();
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
      var URL = "https://www.googleapis.com/calendar/v3/calendars/en.usa%23holiday%40group.v.calendar.google.com/events?key=AIzaSyC7J53tIqAbatG07Zi4OcnhRsjHMxUovgo"
      $.ajax({
        url: URL,
        method: "GET"
      }).then(function (response) {
        console.log(response);
      })
    });
  });

  $(document).on("click", ".result-card", function () {

    var drinkId = $(this).attr("data-id")
    localStorage.clear();
    localStorage.setItem("Id", drinkId);
    document.location.href = "recipe_page.html"
  })
  
  var soon = ["is on the horizon!" ,"is approaching soon!"]
  var otherExsuse = []
  var URL = "https://www.googleapis.com/calendar/v3/calendars/en.usa%23holiday%40group.v.calendar.google.com/events?key=AIzaSyC7J53tIqAbatG07Zi4OcnhRsjHMxUovgo"
  $.ajax({
    url: URL,
    method: "GET"
  }).then(function (response) {
    var holidayFound = false;
    var i = 0;
    while (!holidayFound) {
      if (!moment().isBefore(response.items[i].start.date)) {
        i++
      }
      else if (moment().isBefore(response.items[i].start.date)) {
        $("#reasons").text(response.items[i].summary + " is on the horizon!")
        holidayFound = true
      }
    }
  })
})