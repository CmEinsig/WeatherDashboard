var APIKey = "13dced893da836dc2e78a3a0cc2b6f08";
var recentSearches = JSON.parse(localStorage.getItem('myAppData')) || [];
var city = $("#cityName").val();
var cityNameButton = $("<button>");

//Submit button event listener 
$("#language-buttons").on("click", ".btn", function () {
    var city = $(this).text();
    getCoord(city);
});
$("#submit").on("click", function (e) {
    e.preventDefault();

    cityNameButton.attr("class", "btn");
    cityNameButton.removeClass("btn");
    cityNameButton.text(city);
    $("#language-buttons").prepend(cityNameButton);
    cityNameButton.on("click", function () {
        getSearchHistoryBtn($(this).text());
    });

    getCoord(city);
})