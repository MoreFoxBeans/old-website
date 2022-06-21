let video = document.getElementById('video');

function setup() {
  video.playbackRate = 4.0;

  document.getElementById('play').addEventListener('click', function () {
    document.getElementById('pageMain').style.display = 'none';
    video.play();
  });

  video.addEventListener('ended', function () {
    video.currentTime = 0;
    document.getElementById('pageMain').style.display = 'block';
  });
}
