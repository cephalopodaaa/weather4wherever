//html elements
var searchInput = $("#search-input");
var searchButton = $("#search-button");
var todayPanel = $("#today");
var forecastPanel = $("#forecast");


// CITY SEARCH BAR
searchButton.on("click", function (event) {
    event.preventDefault();
    var city = searchInput.val();
    console.log(city);
})



// WEATHER API SETTINGS
var apiKey = "64f996f6510a1f1f557ed8a96abace4a";
var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

// API CALL
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    //checking if call successful 
    console.log(response);

    // GET TODAYS DATE
    var today = moment().format("D MMM YYYY");
    console.log(today);


})