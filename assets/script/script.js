

$(".add-city").on("click", function(event) {
    //Do we need the city text field to clear after somebody enters a city? If yes, we'll need this event.preventDefault call.
    event.preventDefault ();
    console.log("The typed in city is: "+$(".nameOfCity").val());

    // Create an input tag to attach the new city to. To append to the city history list.
    var cityHistoryListInput = $('<input>');
    var addCitytoList = $(".nameOfCity").val();
    var inputCity = $('<input>').addClass("form-control d-block bg-white").val(addCitytoList).attr({'readonly':'true', 'type':'text'});
    $(".city-history").append(inputCity);
    console.log("This is the city I added to the var addCityToList: " + addCitytoList);

});





// ", "type"="Text", "readonly"="true").addClass("form-control d-block bg-white");