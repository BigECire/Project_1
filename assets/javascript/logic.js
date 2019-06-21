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
    console.log("clicked");

    var drinkId = $(this).attr("data-id")
    localStorage.clear();
    localStorage.setItem("Id", drinkId);
    document.location.href = "recipe_page.html"


  })



  var URL = "https://www.googleapis.com/calendar/v3/calendars/en.usa%23holiday%40group.v.calendar.google.com/events?key=AIzaSyC7J53tIqAbatG07Zi4OcnhRsjHMxUovgo"
  $.ajax({
    url: URL,
    method: "GET"
  }).then(function (response) {
    console.log(response.items[34].start.date);
    console.log(moment().isBefore(response.items[34].start.date))
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