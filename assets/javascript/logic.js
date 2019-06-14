$( document ).ready(function() {
$("#submit").on("click", function(){
    
console.log("working")

var searchType = $(".type-of-search").val();
var seachTerm = $(".search-term").val();
var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/" + searchType + "=" + seachTerm;
// var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list"
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });
})
})