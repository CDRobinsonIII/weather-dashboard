var citySearchHistoryList = [];

// Create an add event listener for when user enters a city in the search box.
$(".add-city").on("click", function(event) {

// The event.preventDefault method in this instance (submit button is clicked) prevents the input from clearing. 
event.preventDefault ();

// If user enters any characters in the search box, then the code inside is processed.
if ($(".nameOfCity").val()!=="") {
    // This console.log to to confirm that the city being entered is being accessed correctly.
    console.log("The typed in city is: "+$(".nameOfCity").val());

    // Create an input tag to attach the new city to. To append to the city history list.
    var cityHistoryListInput = $('<input>');

    // Create a var to store the name of the city typed in by the user.
    var addCitytoList = $(".nameOfCity").val();

    // Add city entered by user to the citySearchHistoryList array. 
    citySearchHistoryList.push(addCitytoList);

    // Create a var to attach the city name to the input tag variable. 
    var inputCity = cityHistoryListInput.addClass("form-control d-block bg-white").val(addCitytoList).attr({'readonly':'true', 'type':'text'});

    // Append the city name entered by the user to the city history list form. 
    $(".city-history").append(inputCity);

    // Test to see if entered city was added to the array. 
    console.log("This is the city that way added to the city search history list array. " +citySearchHistoryList[0]);

    // Clear the search box of the entered city name. 
    $(".nameOfCity").val("");
}

// If user doesn't enter anything before it clicks on the search It exits the function with the else/return so user can input another city.
else {
    return;
}

});