window.onload =  function() {
  var update = new Event("updatePlayer");
  var player = document.getElementById("player");
  var url = document.getElementById("url");
  var submit = document.getElementById("add-submit");
  var src, id;

  player.addEventListener("updatePlayer", function () {
    player.src = src;
    id = null;
    src = null;
  });

  submit.onclick = function() {
    scMeme.resolve(url.value, function(err, d) { // Get track ID
      if (!err) {
        id = JSON.parse(d).id;
        scMeme.getStreamURL(id, function(u) { // i dont like the look of this nest
          src = u
          player.dispatchEvent(update);
        });
      } else {
        console.error(error);
      }
    });
  }
}
