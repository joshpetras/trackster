$(document).ready(function() {
  $("#search-txt").select();
  $("#search-btn").click(function() {
    Trackster.searchTracksByTitle($("#search-txt").val());
  });

});

$(document).on("click", ".artistLink", function(event) {
  var artistSearch = ($(this).text());
  Trackster.searchByArtist(artistSearch);
});


var Trackster = {};
const API_KEY = "e3a1287faa1d7076020e68630e873287";

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  $("#track-list").empty();
  for (var i = 0; i < tracks.length; i++) {
    var mediumAlbumArt = tracks[i].image[1]["#text"];
    var xlAlbumArt = tracks[i].image[3]["#text"];
    var popularity = numeral(tracks[i].listeners).format('0a');
    var $newTrack =
      '<div class="row track">' +
      '<div class="col-xs-1 col-xs-offset-1">' +
      '<a href="' + tracks[i].url + '" target="_blank">' +
      '<i class="fa fa-play-circle-o fa-2x" aria-hidden="true"></i>' +
      '</a>' +
      '</div>' +
      '<div class="col-xs-4 hideOverFlow">' + tracks[i].name + '</div>' +
      '<div class="col-xs-2 hideOverFlow artistLink">' + tracks[i].artist + '</div>' +
      '<div class="col-xs-2"><a href="' + xlAlbumArt + '" target="_blank"><img class="albumArt" src="' + mediumAlbumArt + '" alt="Album Art" /></a></div>' +
      '<div class="col-xs-1 popularity">' + popularity + '</div>' +
      '</div>';
    $("#track-list").append($newTrack);
  }
};

Trackster.renderArtists = function(tracks) {
  $("#track-list").empty();
  for (var i = 0; i < tracks.length; i++) {
    var mediumAlbumArt = tracks[i].image[1]["#text"];
    var xlAlbumArt = tracks[i].image[3]["#text"];
    var popularity = numeral(tracks[i].listeners).format('0a');
    var $newTrack =
      '<div class="row track">' +
      '<div class="col-xs-1 col-xs-offset-1">' +
      '<a href="' + tracks[i].url + '" target="_blank">' +
      '<i class="fa fa-play-circle-o fa-2x" aria-hidden="true"></i>' +
      '</a>' +
      '</div>' +
      '<div class="col-xs-4 hideOverFlow"></div>' +
      '<div class="col-xs-2 hideOverFlow artistLink">' + tracks[i].name + '</div>' +
      '<div class="col-xs-2"><a href="' + xlAlbumArt + '" target="_blank"><img class="AlbumArt" src="' + mediumAlbumArt + '" alt="Album Art" /></a></div>' +
      '<div class="col-xs-1 popularity">' + popularity + '</div>' +
      '</div>';
    $("#track-list").append($newTrack);
  }
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/

Trackster.searchTracksByTitle = function(title) {
  $("#logo").addClass("animator");
  $.ajax({
    url: "https://ws.audioscrobbler.com/2.0/?method=track.search&track=" + title + "&api_key=" + API_KEY + "&format=json",
    success: function(response) {
      console.log(response);
      Trackster.renderTracks(response.results.trackmatches.track);
      $("#logo").removeClass("animator");
    }
  });
};

Trackster.searchByArtist = function(artist) {
  $("#logo").addClass("animator");
  $.ajax({
    url: "https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=" + artist + "&api_key=" + API_KEY + "&format=json",
    success: function(response) {
      console.log(response);
      Trackster.renderArtists(response.results.artistmatches.artist);
      $("#logo").removeClass("animator");
    }
  });
};
