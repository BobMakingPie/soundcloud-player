// initialise things so i can use them in the console
var update, player, url, submit, src, id

window.onload =  function() {
  update = new Event("updatePlayer");
  player = document.getElementById("player");
  url = document.getElementById("url");
  submit = document.getElementById("add-submit");

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
