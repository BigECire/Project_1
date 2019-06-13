$( document ).ready(function() {
$("#submit").on("click", function(){
    
console.log("working")

var searchType = $(".type-of-search").val();
var seachTerm = $(".search-term").val();
var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?" + searchType + "=" + seachTerm;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });
})
})