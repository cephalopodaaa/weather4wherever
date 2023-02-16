
//testing variables
var city = "london";


//html elements
var searchInput = $("#search-input");
var searchButton = $("#search-button")
var today = $("#today");
var forecast = $("#forecast");


//weather API
var apiKey = "64f996f6510a1f1f557ed8a96abace4a";
var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;




$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
})