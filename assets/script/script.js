var citySearchHistoryList = [];

// Function to storage city search history to local storage. 
function storageCitySearchHistory () {
    localStorage.setItem("citySearchHistoryList", JSON.stringify(citySearchHistoryList));
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

    // Create an input tag to attach the new city to. To append to the city history list.
    var cityHistoryListInput = $('<button>');

    // Create a var to attach the city name to the input tag variable. 
    var inputCity = cityHistoryListInput.addClass("form-control historyCityClick").text(addCitytoList);

    // Append the city name entered by the user to the city history list form. 
    $(".city-history").append(inputCity);

    // Test to see if how long 
    console.log("This is the city that way added to the city search history list array. " +citySearchHistoryList[positionInArray]);

    // Clear the search box of the entered city name. 
    $(".nameOfCity").val("");

    storageCitySearchHistory ();
}

// If user doesn't enter anything before it clicks on the search It exits the function with the else/return so user can input another city.
else {
    return;
}

}

// Create an add event listener for when user enters a city in the search box. Call the function addCitytoList to add the city to the citySearchHistoryList array.
$(".add-city").on("click", addCitytoList);

// Create an add event listener for when user clicks on a city in the city history.
$(document).on("click", ".historyCityClick", function() {

    // Find out which city in the search history list was clicked on.
    var theOne = $(this).text();
    console.log("No way: " +theOne);
});
