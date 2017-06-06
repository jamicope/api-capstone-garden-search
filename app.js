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
    }
    //    getResults(userInput);
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
            console.log(receivedApiData);
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
