/*jshint esversion: 6 */ 

// Create an empty array var to hold the cities from the city search history list.
var citySearchHistoryList = [];

// Function to storage city search history to local storage. 
function storageCitySearchHistory () {
    localStorage.setItem("citySearchHistoryList", JSON.stringify(citySearchHistoryList));
}

// Function to see if there are any cities in the city search history stored in the local storage.
function renderCitySearchHistory () {

    // Retrieve stored city search history from local storage.
    var getStoredCities = JSON.parse(localStorage.getItem("citySearchHistoryList"));

    // If there are cities in local storage, render them to the city history list.
    if (getStoredCities !== null) {
        citySearchHistoryList = getStoredCities;

        // Loop through the stored cities and render them in the city search history list.
        for (i=0; i < citySearchHistoryList.length; i++) {
        
            // Create an button tag to attach the new city to. To append to the city history list.
            var cityHistoryListInput = $('<button>');

            // Create a var to attach the city name to the input tag variable. 
            var inputCity = cityHistoryListInput.addClass("form-control historyCityClick").text(citySearchHistoryList[i]);

            // Append the city name from local storage to the city history list. 
            $(".city-history").append(inputCity);
        }
    }
    
    // If there are no cities in local storage.
    else {
        // Call getLocation function to ask user for their location information in order to display their city weather in the dashboard.
        getLocation();
        return;
    }
    // Call getCurrentWeather function to render last city in the city search list array to the current weather dashboard.
    getCurrentWeather (citySearchHistoryList[citySearchHistoryList.length-1]);

}

// Call this getLocation function only when the weather dashboard is started for the first time or after local storage is cleared.
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
    alert("Geolocation is not supported by this browser.");
    }
}

// This function runs if the users clicks ok to get current location. 
function showPosition(position) {

    // Declare lat and lon variables.
    var currentLat=position.coords.latitude;
    var currentLong=position.coords.longitude;

    // Call getCurrrentLocationWeather function to get city name attached to the lat and lon coordinates.
    getCurrentLocationWeather(currentLat,currentLong);
}

// Function to an add city to the citySearchHistoryList array. 
function addCitytoList(event) {

// The event.preventDefault method in this instance (submit button is clicked) prevents the input from clearing. 
event.preventDefault ();

// If user enters any characters in the search box, then the code inside is processed.
if ($(".nameOfCity").val()!=="") {

    var getStoredCities = JSON.parse(localStorage.getItem("citySearchHistoryList"));

    if (getStoredCities !== null) {
        citySearchHistoryList = getStoredCities;
    }

    // Create a var to store the name of the city typed in by the user.
    var addCitytoList = $(".nameOfCity").val();

    // Add city entered by user to the citySearchHistoryList array. 
    citySearchHistoryList.push(addCitytoList);

    var positionInArray = (citySearchHistoryList.length-1);

    // Create an button tag to attach the new city to. To append to the city history list.
    var cityHistoryListBtn = $('<button>');

    // Create a var to attach the city name to the button tag variable. 
    var buttonCity = cityHistoryListBtn.addClass("form-control historyCityClick").text(addCitytoList);

    // Append the city name entered by the user to the city history list. 
    $(".city-history").append(buttonCity);

    // Clear the search box of the entered city name. 
    $(".nameOfCity").val("");

    storageCitySearchHistory ();
    getCurrentWeather (addCitytoList);
}

// If user doesn't enter anything before it clicks on the search It exits the function with the else/return so user can input another city.
else {
    return;
}

}

// Thus function uses the lat and lon coordinates from the user's current location to retrieve the city name via the open weather API.
// As mentioned above this function is called only when the weather dashboard is started for the first time or after local storage is cleared.
// The user only has to allow access to current location.

function getCurrentLocationWeather (lat,lon) {

    var APIKey = "e26d4a663d05cc95479493f79a86a25d";

    var queryURLForecast = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=imperial&appid=" + APIKey;
    
    $.ajax({
      url: queryURLForecast,
      method: "GET"
    })

    .then(function(response) {

        // Declare city of the user's current location.
        var currentLocationCity = response.name;

        // Push user's current city to the city search history list.
        citySearchHistoryList.push(currentLocationCity);

        // Store city search history list to local storage.
        storageCitySearchHistory ();

        // Render user's current city to the city search history list.
        renderCitySearchHistory ();
    });
}

// This function gets the current weather for the city entered by the user or selected via the city search history list.        
function getCurrentWeather (addCitytoList) {

    // This is our API key. 
    var APIKey = "e26d4a663d05cc95479493f79a86a25d";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+addCitytoList+"&units=imperial&appid&appid=" + APIKey;

    $(".fiveDayDashboard").html("");

    // We then created an AJAX call.
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {

        // Get city name from object 
        var tempName = response.name;
        // Display in current weather display using class currentTemp.
        $(".currentCity").text(tempName);

        // Use the moment object along with the format method to display the current day in the current weather section of dashboard.
        $(".currentDate").text(moment().format('L'));

        // Get current weather condition icon from object.
        var tempWeatherIconId = response.weather[0].icon;
        var tempWeatherIconIdLink = `http://openweathermap.org/img/wn/${tempWeatherIconId}@2x.png`;
        // Display in current weather icon display using class currentWeatherIcon.
        $(".currentWeatherIcon").attr("src",tempWeatherIconIdLink);

        // Get temperature from object. No need to convert from kelvin since we added the imperial unit in the queryURL.
        var tempCurrent = response.main.temp;
        // Display in current weather display using class currentTemp.
        $(".currentTemp").text("Temperature: " + tempCurrent + " °F");

        // Get humidity from object.
        var tempHumidity = response.main.humidity;
        // Display in current weather display using class currentHumidity.
        $(".currentHumidity").text("Humidity: " + tempHumidity + "%");

        // Get wind speed from object.
        var tempWindSpeed = response.wind.speed;
        // Display in current weather display using class currentWindSpeed.
        $(".currentWindSpeed").text("Wind Speed: " + tempWindSpeed + " MPH");

        // Get lat and long coordinates from the response. We need them to make another AJAX call to get the heat index and 5 day forecast.
        var lat = response.coord.lat;
        var lon = response.coord.lon;

        // Call the function to get the heat index and 5 day forecast and pass the lat and lon coordinates to it. 
        getHeatIndex (lat, lon);

    });
}

// Function to retrieve and display the heat index.
function getHeatIndex(lat, lon) {

    // Create an AJAX call to get heat index based off of the lat and long coordinates. 
    // Create new query URL to access to object that contains the required information.
    // This is our API key. 
    var APIKey = "e26d4a663d05cc95479493f79a86a25d";

    var queryURLForecast = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&appid=" + APIKey;
    
    $.ajax({
      url: queryURLForecast,
      method: "GET"
    })
    .then(function(responseHeatIndexAndForecast) {

        // Get heat index from object. 
        var tempHeatIndex = responseHeatIndexAndForecast.current.uvi;
    
        // This clears out previously displayed heat indexes in order to show the correct heat index color.
        $(".currentHeatIndex").empty();
        $(".currentHeatIndex").text("Heat Index: ");
       
        // Display in current weather display using class currentHeatIndex.
        var addSpan = $("<span>").addClass("heat-index badge");
        $(".currentHeatIndex").append(addSpan);

        $(".heat-index").text(tempHeatIndex);

        // Determine color of badge for the heat index. 
        if (tempHeatIndex <3) {
            // Less than 3 is green = favorable.
            $(".heat-index").addClass("badge-success");
        }
            // Greater than 5 is red = severe.
            else if (tempHeatIndex >5) {
                $(".heat-index").addClass("badge-danger");
            }
            
            // Greater between 2 and 6 (3-5) is yellow = moderate.
            else {
                $(".heat-index").addClass("badge-warning");
            }

        // Call getFiveDayForecast to display 5 day forecast in the weather dashboard.
        getFiveDayForecast(responseHeatIndexAndForecast);
    });
}

// Function to retrieve and display the 5 day forecast in the weather dashboard.
function getFiveDayForecast (responseHeatIndexAndForecast) {

    // Run loop to generate the forecast divs for the next 5 days. 
    for (i=1; i < 6; i++) {

        // Create div tag to append five day forecast information to. 
        var forecastDiv = $("<div>").addClass(`col-md-2 card text-center m-auto fiveDayForecast${i}`);
        $(".fiveDayDashboard").append(forecastDiv);

        // Create p tag to display date for forecast div.
        var fiveDayDate = $("<p>").text((moment().add(i,'days').format('L')));

        // Declare weather icon variable for the forecast div.
        var fiveDayIconId = responseHeatIndexAndForecast.daily[i].weather[0].icon;
        var fiveDayIconIdLink = `http://openweathermap.org/img/wn/${fiveDayIconId}@2x.png`;

        // Create image tag for forecast div to display weather icon.
        var fiveDayIconImg = $("<img>").attr("src",fiveDayIconIdLink);

        // Create p tag to dispay the temperate for the forecast div.
        var fiveDayTemp = $("<p>").text("Temp: " + responseHeatIndexAndForecast.daily[i].temp.day);

        // Create p tag to dispay the humidity for the forecast div.
        var fiveDayHumidity =  $("<p>").text("Humidity: " + responseHeatIndexAndForecast.daily[i].humidity + "%");

        // Append the date, icon, temperature, and humidity tags to the forecast div. 
        $(`.fiveDayForecast${i}`).append(fiveDayDate).append(fiveDayIconImg).append(fiveDayTemp).append(fiveDayHumidity);

    } 
}

// First thing to do is render any cities stored in local storage before you add more cities to the city search history list. 
renderCitySearchHistory();

// Create an add event listener for when user enters a city in the search box. Call the function addCitytoList to add the city to the citySearchHistoryList array.
$(".add-city").on("click", addCitytoList);

// Create an add event listener for when user clicks on a city in the city history.
$(document).on("click", ".historyCityClick", function() {

    // Find out which city in the search history list was clicked on.
    var theOne = $(this).text();

    // Call getCurrentWeather function to display current weather on the dashboard for the city that was clicked on in the history list.
    getCurrentWeather(theOne);
});
