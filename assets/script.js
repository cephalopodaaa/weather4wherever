// testing params
var city = "london";

// HTML ELEMENTS USING JQUERY
var searchInput = $("#search-input");
var searchButton = $("#search-button");
var todayPanel = $("#today");
var forecastPanel = $("#forecast");

var background = $('body');
var output;
var fiveDayOutput = {};
var apiKey;


// STYLING
background.css({
    "background": "linear-gradient(217deg,#e66465, #9198e5)",
    "min-height": "100vh",
    "color": "white"
});
searchButton.css({
    "background-color": "lightblue",
    "border": "thick",
    "color": "white",
    "padding": "15px 5px",
    "text-align": "center",
    "text-decoration": "none",
    "display": "inline-block",
    "font-size": "16px",
    "border-top-right-radius": "50px",
    "border-bottom-right-radius": "50px",
    "border-top-left-radius": "0px",
    "border-bottom-left-radius": "0px",
    "box-shadow": "10px 10px 20px rgba(0, 0, 0, 0.7)",
    "wrap": "nowrap"
});
searchInput.css({
    "background-color": "salmon",
    "border": "none",
    "color": "white",
    "padding": "12px 5px",
    "text-align": "center",
    "text-decoration": "none",
    "display": "inline-block",
    "font-size": "16px",
    "border-top-left-radius": "50px",
    "border-bottom-left-radius": "50px",
    "border-top-right-radius": "0px",
    "border-bottom-right-radius": "0px",
    "box-shadow": "10px 10px 20px rgba(0, 0, 0, 0.7)"
    
});





// CITY SEARCH BAR
searchButton.on("click", function (event) {
    event.preventDefault();
    var city = searchInput.val();
    getWeather(city);
});




// API CALLS
function getWeather(city) {
    // TODAY WEATHER API CALL
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
        // making output array for forecast (fiveDayOutput)
        for (var i = 1; i < 6; i++) {
            entryName = `day${i}`;
            var dayTimesEight;
            if (i === 5) {
                dayTimesEight = 39 // this is because the forecast only goes up to 39 entries so last forecast day needs to use 3 hours earlier
            } else {
                dayTimesEight = Math.floor(i*8);    //as forecast every 3 hours, must times by eight to get daily forecast
            }
            fiveDayOutput[entryName] = {
                date: moment().add(i, 'day').format("D MMM YYYY"),
                day: moment().add(i, 'day').format("dddd"),
                temperature: Math.floor(response.list[dayTimesEight].main.temp - 273.15)
            };
        }


        // Call function to create HTML content with `output` data
        createWeatherDisplay(output, fiveDayOutput);
    });
}









// DISPLAY
function createWeatherDisplay(data, forecast) {
   
   
    // MAKING TODAY PANEL
    // clear previous content from the todayPanel
    todayPanel.empty();

    var weatherDiv = $("<div>");
    var cityHeader = $("<h2>").text(moment().format("dddd") + "'s weather in " + data.name + ":");
    weatherDiv.append(cityHeader);
    var descriptionP = $("<h3>").text(data.description).css({
        "text-align":"center",
        "color": "purple"
});
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



    // MAKING 5 DAY FORECAST PANEL
    //clear previous content from forecastPanel
    forecastPanel.empty();

    for (i = 1; i < 6; i++) {
        var cardDiv = $("<div>");
        var dayHeader = $("<h3>").text(forecast[`day${i}`].day);
        cardDiv.append(dayHeader);

        forecastPanel.append(cardDiv);

        forecastPanel.css({
            "display": "flex",
            "justify-content": "space-around",
        })
        cardDiv.css({
            "flex": "1 1 100px",
            "min-height": "30vh",
            "background-color": "violet",
            "margin": "0.5rem",
            "padding": "0.75rem"

        });

    }
};






