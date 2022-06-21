var gameInstance = UnityLoader.instantiate("gameContainer", "Build/WebGL1Coolmath.json", {
  onProgress: UnityProgress
});

function UnityProgress(unityInstance, progress) {
  if (!unityInstance.Module)
    return;
  if (!unityInstance.logo) {
    unityInstance.logo = document.createElement("div");
    unityInstance.logo.className = "wixlogo";
    unityInstance.container.appendChild(unityInstance.logo);
  }
  if (!unityInstance.progress) {
    unityInstance.progress = document.createElement("div");
    unityInstance.progress.className = "progress";
    unityInstance.progress.empty = document.createElement("div");
    unityInstance.progress.empty.className = "empty";
    unityInstance.progress.appendChild(unityInstance.progress.empty);
    unityInstance.progress.full = document.createElement("div");
    unityInstance.progress.full.className = "full";
    unityInstance.progress.appendChild(unityInstance.progress.full);
    unityInstance.container.appendChild(unityInstance.progress);
  }
  unityInstance.progress.full.style.width = (100 * progress) + "%";
  unityInstance.progress.empty.style.width = (100 * (1 - progress)) + "%";
  if (progress == 1)
    unityInstance.logo.style.display = unityInstance.progress.style.display = "none";
}

setTimeout(function(){
  if(document.getElementsByTagName("canvas").length) {
    document.getElementsByTagName("body")[0].classList.add("no-select")
  }
}, 2000);