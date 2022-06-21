var gameInstance = UnityLoader.instantiate("gameContainer", "Build/WebGL3Coolmath.json");

setTimeout(function(){
  if(document.getElementsByTagName("canvas").length) {
    document.getElementsByTagName("body")[0].classList.add("no-select")
  }
}, 2000);
