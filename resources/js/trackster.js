/* global variables and constants */

var Trackster = {};
var Tracks = [];
var Artists = [];
var searchKey = "none";
var sortDirection = 1;
const API_KEY = "e3a1287faa1d7076020e68630e873287";

/* Code to execute when page is loaded and ready */

$(document).ready(function() {
  $("#search-txt").select();
  $("#search-btn").click(function() {
    event.preventDefault();
    Trackster.searchTracksByTitle($("#search-txt").val());
  });
  $(".sortable").click(function() {
    switch (searchKey) {
      case "none":
        break;
      case "track":
        switch ($(this).text()) {
          case "Song ":
            Trackster.columnSort("name");
            break;
          case "Artist ":
            Trackster.columnSort("artist");
            break;
          case "Art. ":
            Trackster.columnSort("artist");
            break;
          case "Popularity ":
            Trackster.columnSort("listeners");
            break;
          case "Pop. ":
            Trackster.columnSort("listeners");
            break;
        }
        break;
      case "artist":
        switch ($(this).text()) {
          case "Song ":
            break;
          case "Artist ":
            Trackster.columnSort("name");
            break;
          case "Art. ":
            Trackster.columnSort("name");
            break;
          case "Popularity ":
            Trackster.columnSort("listeners");
            break;
          case "Pop. ":
            Trackster.columnSort("listeners");
            break;
        }
        break;
    }
  });
});

$(document).on("click", ".artistLink", function(event) {
  var artistSearch = ($(this).text());
  Trackster.searchByArtist(artistSearch);
});

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
      '<div class="col-xs-3 hideOverFlow">' + tracks[i].name + '</div>' +
      '<div class="col-xs-2 hideOverFlow artistLink">' + tracks[i].artist + '</div>' +
      '<div class="col-xs-2"><a href="' + xlAlbumArt + '" target="_blank"><img class="albumArt" src="' + mediumAlbumArt + '" alt="Album Art" /></a></div>' +
      '<div class="col-xs-2">' + popularity + '</div>' +
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
      '<div class="col-xs-3 hideOverFlow"></div>' +
      '<div class="col-xs-2 hideOverFlow artistLink">' + tracks[i].name + '</div>' +
      '<div class="col-xs-2"><a href="' + xlAlbumArt + '" target="_blank"><img class="AlbumArt" src="' + mediumAlbumArt + '" alt="Album Art" /></a></div>' +
      '<div class="col-xs-2">' + popularity + '</div>' +
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
      Tracks = response.results.trackmatches.track;
      Trackster.renderTracks(Tracks);
      searchKey = "track";
      $("i.fa.fa-sort.hideable").show();
      $("#logo").removeClass("animator");
      $("#search-txt").select();
    }
  });
};

Trackster.searchByArtist = function(artist) {
  $("#logo").addClass("animator");
  $.ajax({
    url: "https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=" + artist + "&api_key=" + API_KEY + "&format=json",
    success: function(response) {
      console.log(response);
      Artists = response.results.artistmatches.artist;
      Trackster.renderArtists(Artists);
      searchKey = "artist";
      $("i.fa.fa-sort.hideable").hide();
      $("#logo").removeClass("animator");
      $("#search-txt").select();
    }
  });
};

Trackster.columnSort = function(columnID) {
  switch (searchKey) {
    case "track":
      if (columnID === "listeners") {
        if (sortDirection === 1) {
          Tracks.sort(function(a, b) {
            sortDirection = 0;
            return b[columnID] - a[columnID];
          });
        } else {
          Tracks.sort(function(a, b) {
            sortDirection = 1;
            return a[columnID] - b[columnID];
          });
        }
      } else {
        if (sortDirection === 1) {
          Tracks.sort(function(a, b) {
            sortDirection = 0;
            return (a[columnID]).localeCompare(b[columnID]);
          });
        } else {
          Tracks.sort(function(a, b) {
            sortDirection = 1;
            return (b[columnID]).localeCompare(a[columnID]);
          });
        }
      }
      Trackster.renderTracks(Tracks);
      break;
    case "artist":
      if (columnID === "listeners") {
        if (sortDirection === 1) {
          Artists.sort(function(a, b) {
            sortDirection = 0;
            return b[columnID] - a[columnID];
          });
        } else {
          Artists.sort(function(a, b) {
            sortDirection = 1;
            return a[columnID] - b[columnID];
          });
        }
      } else {
        if (sortDirection === 1) {
          Artists.sort(function(a, b) {
            sortDirection = 0;
            return (a[columnID]).localeCompare(b[columnID]);
          });
        } else {
          Artists.sort(function(a, b) {
            sortDirection = 1;
            return (b[columnID]).localeCompare(a[columnID]);
          });
        }
      }
      Trackster.renderArtists(Artists);
      break;
  }
};
