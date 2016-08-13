var sc = require("soundcloud");
var config = require("../config");
var scID = config.scid;

sc.initialize({ client_id: scID });

module.exports = {
  resolve: function(url, callback) { // i just found out there's an api.resolve() but ceebs

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        var resp = JSON.parse(request.responseText)
        if (!resp.errors) {
          callback(null, resp); // Pass response to callback
        } else {
          callback(console.error(resp.errors[0].error_message), null);
        }
      }
    }
    request.open("GET", `https://api.soundcloud.com/resolve?url=${url}&client_id=${scID}`, true);
    request.send(null);

  },

  getStreamURL: function (id, callback) {
    // you can get the stream url easily in python but nooooo
    // "if we put that into the js api ppl will pirate music" - soundcloud, probably
    // i mean there are already plenty of online downloaders that won't help
    // i'm just wasting file size now
    // retrieve stream URL from "streamUrlsEndpoint"
    // hmm this code looks familiar
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        setStrUrl(request.responseText); // Pass response to the other funtion
      }
    }
    request.open("GET", `https://api.soundcloud.com/tracks/${id}/streams?client_id=${scID}`, true);
    request.send(null);

    function setStrUrl (data) {
      if (!data) {
        callback(console.error("No data received"), null);
      } else {
        callback(null, JSON.parse(data).http_mp3_128_url);
      }
    }
  },

  getObj: function (id, cb) {
    var trkObj = {id: id};
    sc.get("/tracks/" + id).then(function (d) {
      if (!d.errors) {
        trkObj.title = d.title;
        trkObj.uploader = d.user.username;
        trkObj.arturl = d.artwork_url;
        scMeme.getStreamURL(id, function (err, d) {
          if (!err) {
            trkObj.streamurl = d;
            cb(null, trkObj);
          } else {
            cb(err, null);
          }
        });
      } else {
        cb(console.error(d.errors[0].error_message), null);
      }
    });
  }
}
