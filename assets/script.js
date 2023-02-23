// testing params
var city = "london";

// HTML ELEMENTS USING JQUERY
var searchInput = $("#search-input");
var searchButton = $("#search-button");
var todayPanel = $("#today");
var forecastPanel = $("#forecast");

var output;

// CITY SEARCH BAR
searchButton.on("click", function (event) {
    event.preventDefault();
    var city = searchInput.val();
    getWeather(city);
});

function getWeather(city) {
    // WEATHER API CALL
    var apiKey = "64f996f6510a1f1f557ed8a96abace4a";
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //checking if call successful 
        console.log(response);

        // GET TODAYS DATE
        var today = moment().format("D MMM YYYY");
        console.log(today);

        // GET WEATHER FROM RESPONSE
        output = {
            name: response.city.name,
            coordinates: response.city.coord,
            description: response.list[0].weather[0].description,
            temperature: Math.floor(response.list[0].main.temp - 273.15),
            windAngle: response.list[0].wind.deg,
            windSpeed: response.list[0].wind.speed,
            windGust: response.list[0].wind.gust,
            humidity: response.list[0].main.humidity
        };

        // Call function to create HTML content with `output` data
        createWeatherDisplay(output);
    });
}

function createWeatherDisplay(data) {
    // clear previous content from the todayPanel
    todayPanel.empty();

    var weatherDiv = $("<div>");
    var cityHeader = $("<h2>").text(moment().format("dddd") + "'s weather in " + data.name + ":");
    weatherDiv.append(cityHeader);
    var descriptionP = $("<h3>").text(data.description);
    weatherDiv.append(descriptionP);

    //list of details
    var weatherList = $("<ul>")
    weatherDiv.append(weatherList)

    var tempP = $("<li>").text("Temperature: " + data.temperature + " °C");
    weatherList.append(tempP);

    var windP = $("<li>").text("Wind: " + data.windSpeed + " m/s, gusting to " + data.windGust + " m/s");
    weatherList.append(windP);

    var humidityP = $("<li>").text("Humidity: " + data.humidity + "%");
    weatherList.append(humidityP);

    todayPanel.append(weatherDiv);
    

};

