// initialise things so i can use them in the console
var update, player, url, submit, src, id, queue, qTemplate, queueE;

function addToQueue(trkObj) {
  if (queue.length >= 50) {
    return console.error("Max queue length 50 tracks");
  } else {
    queue.push(trkObj);
    return null;
  }
}

function updateQueueVis () {
  while (queueE.firstChild) {
    queueE.removeChild(queueE.firstChild);
  }
  queue.forEach(function(trkObj) {
    var qItem = document.createElement("li");
    qItem.className = "queued";
    console.log(qItem);
    console.log(qTemplate.childNodes);
    qTemplate.childNodes.forEach(function(a, b, c) {qItem.appendChild(a)});
    qItem.childNodes[1].appendChild(document.createTextNode(trkObj.uploader));
    qItem.childNodes[2].appendChild(document.createTextNode(trkObj.title));
    qItem.childNodes[3].appendChild(document.createTextNode(trkObj.id));
    queueE.appendChild(qItem);
  });
}

function refreshPlayer() {
  var toPlay = queue.shift();
  player.src = toPlay.streamurl;
  updateQueueVis();
}

window.onload =  function() {
  // DOM elements
  player = document.getElementById("player");
  url = document.getElementById("url");
  submit = document.getElementById("add-submit");
  qTemplate = document.getElementById("qTemplateWrapper");
  queueE = document.getElementById("queue");
  // Other
  queue = []

  submit.onclick = function () {
    scMeme.resolve(url.value, function (err, data) {
      console.log("resolved");
      if (!err) {
        if (data.kind == "track") {

          console.log("trk");
          scMeme.getObj(data.id, function(err, d) {
            console.log("hi");
            if (!err) { addToQueue(d) }
          });

        } else if (data.kind == "playlist") {

          console.log("playlist");
          data.tracks.forEach(function(t) {
            scMeme.getObj(t.id, function(err, d) {
              if (!err) { addToQueue(d) }
            });
          });

        }
      }
    });
    url.value = "";
  }

  /*player.addEventListener("updatePlayer", function () {
    player.src = src;
    id = null;
    src = null;
  });

  submit.onclick = function() {
    scMeme.resolve(url.value, function(err, d) { // Get track ID
      if (!err) {
        id = JSON.parse(d).id;
        scMeme.getStreamURL(id, function(err, u) { // i dont like the look of this nest
          if (!err) {
            src = u
            player.dispatchEvent(update);
          }
        });
      }
    });
  }*/
}
