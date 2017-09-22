$(document).ready(function() {
  $("#search-btn").click(function() {
    Trackster.searchTracksByTitle($("#search-txt").val());
  });
});




var Trackster = {};
const API_KEY = "e3a1287faa1d7076020e68630e873287";

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {

};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url: "http://ws.audioscrobbler.com/2.0/?method=track.search&track=" + title + "&api_key=" + API_KEY + "&format=json",
    success: function(response) {
      console.log(response);
    }
  });

};
