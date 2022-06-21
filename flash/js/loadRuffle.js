function ruffle(file) {
  window.RufflePlayer = window.RufflePlayer || {};

  window.RufflePlayer.config = {
    "publicPath": undefined,
    "polyfills": true,

    "autoplay": "auto",
    "unmuteOverlay": "visible",
    "backgroundColor": null,
    "letterbox": "on",
    "warnOnUnsupportedContent": false,
    "contextMenu": true,
    "showSwfDownload": true,
    "upgradeToHttps": window.location.protocol === "https:",
    "maxExecutionDuration": {"secs": 15, "nanos": 0},
    "logLevel": "error",
    "base": null,
    "menu": true,
    "salign": "",
    "scale": "showAll",
    "quality": "high",
  };

  window.addEventListener("DOMContentLoaded", () => {
      let ruffle = window.RufflePlayer.newest();
      let player = ruffle.createPlayer();
      let container = document.getElementById("player");
    
      container.appendChild(player);
      player.load("assets/" + file);
  });
}