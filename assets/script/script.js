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
    
    // If there are no cities in local storage, this else will end the function.
    else {
        return;
    }
    // Call getCurrentWeather function to render last city in the city search list array to the current weather dashboard.
    getCurrentWeather (citySearchHistoryList[citySearchHistoryList.length-1]);

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

    // This clears the city search history so that we can append the new city to the list without adding continuously adding to the list. 
    // $(".city-history").empty();

    // This console.log to to confirm that the city being entered is being accessed correctly.
    console.log("The typed in city is: "+$(".nameOfCity").val());

    // Create a var to store the name of the city typed in by the user.
    var addCitytoList = $(".nameOfCity").val();

    // Add city entered by user to the citySearchHistoryList array. 
    citySearchHistoryList.push(addCitytoList);

    var positionInArray = (citySearchHistoryList.length-1);
    console.log("This is the index of the citySearchHistoryList array: " +positionInArray);

    // Create an button tag to attach the new city to. To append to the city history list.
    var cityHistoryListBtn = $('<button>');

    // Create a var to attach the city name to the button tag variable. 
    var buttonCity = cityHistoryListBtn.addClass("form-control historyCityClick").text(addCitytoList);

    // Append the city name entered by the user to the city history list. 
    $(".city-history").append(buttonCity);

    // Test to see if how long 
    console.log("This is the city that way added to the city search history list array. " +citySearchHistoryList[positionInArray]);

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

function getCurrentWeather (addCitytoList) {

    // This is our API key. Add your own API key between the ""
    var APIKey = "e26d4a663d05cc95479493f79a86a25d";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+addCitytoList+"&units=imperial&appid&appid=" + APIKey;

    // We then created an AJAX call
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
        console.log(response);

    // Get city name from object 
    var tempName = response.name;
    // Display in current weather display using class currentTemp.
    $(".currentCity").text(tempName);

    // Use the moment object along with the format method to display the current day in the current weather section of dashboard.
    $(".currentDate").text(moment().format('L'));

    // Get current weather condition icon from object.
    var tempWeatherIconId = response.weather[0].icon;
    var tempWeatherIconIdLink = `http://openweathermap.org/img/wn/${tempWeatherIconId}@2x.png`
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

    // Get heat index from object. In order to do that you need to get the coordinates from this object.
    // Then use the coordinates to make another AJAX call to get the right object to get the heat index and 7 day forecast.
    // var tempHeatIndex = 
    // // Display in current weather display using class currentHeatIndex.
    // $(".currentHeatIndex").text("Heat Index: " + tempHeatIndex);


    });
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
