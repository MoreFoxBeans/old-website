var gameInstance = UnityLoader.instantiate("gameContainer", "Build/WebGL.json");

setTimeout(function(){
  if(document.getElementsByTagName("canvas").length) {
    document.getElementsByTagName("body")[0].classList.add("no-select")
  }
}, 2000);
