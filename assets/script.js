var APIKey = "13dced893da836dc2e78a3a0cc2b6f08";
var recentSearches = JSON.parse(localStorage.getItem('myAppData')) || [];
var city = $("#cityName").val();
var cityNameButton = $("<button>");

//Submit button event listener 
$("#language-buttons").on("click", ".btn", function () {
    var city = $(this).text();
    coord(city);
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

    coord(city);
})
//Function to get the city 
function coord(city) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            current(lat, lon);
            forecast(lat, lon);
        });
}

//function for current weather 
function current(lat, lon) {
    $("#current").empty();

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            var pcityname = $("<h3>");
            pcityname.text(data.name);
            $("#current").append(pcityname);

            var pTemp = $("<p>");
            pTemp.text("Temperature: " + data.main.temp + " °F");
            $("#current").append(pTemp);

            var pFeelsLike = $("<p>");
            pFeelsLike.text("Feels like: " + data.main.feels_like + " °F");
            $("#current").append(pFeelsLike);

            var pHum = $("<p>");
            pHum.text("Humidity: " + data.main.humidity + " %");
            $("#current").append(pHum);
        })
}

//function for forcated weather
function forecast(lat, lon) {
    $("#days").empty(); // Clear the #days element
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            for (var i = 0; i < data.list.length; i += 8) {

                var dateToday = $("<h2>");
                var date = new Date(data.list[i].dt_txt);
                var options = { weekday: 'long', month: 'long', day: 'numeric' };
                var formattedDate = date.toLocaleDateString(undefined, options);
                dateToday.text(formattedDate);
                $("#days").append(dateToday);

                var forecastIcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
                $("#days").append(forecastIcon);
                console.log(data.list[i].weather[0].icon);

                var pTemp = $("<p>");
                pTemp.text("Temperature: " + data.list[i].main.temp + " °F");
                $("#days").append(pTemp);

                var pFeelsLike = $("<p>");
                pFeelsLike.text("Feels like: " + data.list[i].main.feels_like + " °F");
                $("#days").append(pFeelsLike);

                var pHum = $("<p>");
                pHum.text("Humidity: " + data.list[i].main.humidity + " %");
                $("#days").append(pHum);
            }
        })
}
