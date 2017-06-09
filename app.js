/*STEP 1-- Get input from user*/
$(".js-select-input").submit(function (event) {
    //force JS to handle form submissions
    event.preventDefault();
    //use the input from the search form
    var userInputPlant = $("#plants").val();
    var userInputState = $("#state").val();
    if (userInputPlant == "" || userInputState == "") {
        alert("Please select a plant and a state")
    } else {
        console.log(userInputPlant, userInputState);
        getYoutubeResults(userInputPlant);
        getGoogleBooksResults(userInputPlant);
        getWeatherResults(userInputState);
    }
});


/*youtube functionality-- call through API to get JSON info*/
function getYoutubeResults(userSearchTerm) {
    $.getJSON("https://www.googleapis.com/youtube/v3/search", {
            part: "snippet",
            maxResults: 15,
            key: "AIzaSyBkUQ0jzlCrX1abh4zChxFSPT3_mna-1T4",
            q: userSearchTerm,
            type: "video"
        },
        function (receivedApiData) {
            //console.log(receivedApiData);
            if (receivedApiData.pageInfo.totalResults == 0) {
                alert("No videos found.");
            } else {
                displayYoutubeSearchResults(receivedApiData.items);
            }
        });
}

/*youtube Return info from the JSON in appropriate containers*/
function displayYoutubeSearchResults(videosArray) {
    var buildTheHtmlOutput = "";

    $.each(videosArray, function (videosArrayKey, videosArrayValue) {
        buildTheHtmlOutput += "<li>";
        buildTheHtmlOutput += "<p>" + videosArrayValue.snippet.title + "</p>";
        buildTheHtmlOutput += "<a href='https://www.youtube.com/watch?v=" + videosArrayValue.id.videoId + "' target='_blank'>";
        buildTheHtmlOutput += "<img class='vid-pics' src='" + videosArrayValue.snippet.thumbnails.high.url + "'/>";
        buildTheHtmlOutput += "</a>";
        buildTheHtmlOutput += "</li>";
    });

    $(".youtube-results ul").html(buildTheHtmlOutput);
}

/*Weatherbit functionality-- call through API to get JSON info*/
function getWeatherResults(userSearchTerm) {
    var params = {
        key: '0047b4bcf6b34ac3b08735c1586bb5b0',
        maxResults: 15,
        city: userSearchTerm
    };
    var result = $.ajax({
            /* update API end point */
            url: "https://api.weatherbit.io/v1.0/current/geosearch",
            data: params,
            dataType: "jsonp",
            /*set the call type GET / POST*/
            type: "GET"
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            displayWeatherResults(result.data);
        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

/*Weatherbit Return info from the JSON in appropriate containers*/
function displayWeatherResults(weatherArray) {
    var buildTheHtmlOutput = "";

    $.each(weatherArray, function (index, value) {
        buildTheHtmlOutput += "<li>";
        buildTheHtmlOutput += "<h3>Temp: " + (((value.temp * 9) / 5) + 32).toFixed(1) + " Fahrenheit</h3>";
        buildTheHtmlOutput += "<h3>Sunrise : " + value.sunrise + " GMT</h3>";
        buildTheHtmlOutput += "<h3>Sunset: " + value.sunset + " GMT</h3>";
        buildTheHtmlOutput += "<h3>Wind Direction: " + value.wind_cdir + "</h3>";
        buildTheHtmlOutput += "<h3>Wind Speed: " + value.wind_spd + " MPH</h3>";
        buildTheHtmlOutput += "<h3>Precipitation: " + value.precip + " inches</h3>";
        buildTheHtmlOutput += "</li>";
    });

    $(".weather-results ul").html(buildTheHtmlOutput);
}

/*google books functionality-- call through API to get JSON info*/
function getGoogleBooksResults(userSearchTerm) {
    $.getJSON("https://www.googleapis.com/books/v1/volumes", {
            maxResults: 11,
            key: "AIzaSyCHXrCpLMW0YYC6gQeu1jPxZZDwJwPEW3c",
            q: "how to grow" + userSearchTerm,
        },
        function (receivedApiData) {
            if (receivedApiData.items == 0) {
                alert("No books found.");
            } else {
                displayGoogleBooksResults(receivedApiData.items);
            }
        });
}

/*Google Books Return info from the JSON in appropriate containers*/
function displayGoogleBooksResults(booksArray) {
    var htmlOutput = "";

    $.each(booksArray, function (index, value) {
        htmlOutput += '<li><h3>' + value.volumeInfo.title + '</h3>';
        htmlOutput += '<p>' + value.volumeInfo.authors + '</p>';
        htmlOutput += '<a href="' + value.volumeInfo.previewLink + '" target= "blank" class="btn btn-default moreInfoButton" role="button">More Info...</a></li></li>';
        htmlOutput += '<li>';
        if (value.volumeInfo.imageLinks) {
            if (value.volumeInfo.imageLinks.thumbnail.length > 0) {
                htmlOutput += '<li><img src = "' + value.volumeInfo.imageLinks.thumbnail + '"/>';
            } else {
                htmlOutput += '<li><img src = "images/book-default.jpg"/>';
            }
        } else {
            htmlOutput += '<li><img src = "images/book-default.jpg"/>';
        }
    });

    $(".google-books-results ul").html(htmlOutput);
}
