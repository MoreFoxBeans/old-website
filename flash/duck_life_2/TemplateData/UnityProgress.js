var gameInstance = UnityLoader.instantiate("gameContainer", "Build/Duck Life 2.json");

setTimeout(function(){
  if(document.getElementsByTagName("canvas").length) {
    document.getElementsByTagName("body")[0].classList.add("no-select")
  }
}, 2000);