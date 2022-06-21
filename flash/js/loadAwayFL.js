function awayfl(title, key, name, file) {
  window.addEventListener("load", () => {
    PokiSDK.init().then(
      () => {
        onPokiInitComplete(false);
      }
    ).catch(
      () => {
        onPokiInitComplete(true);
      }
    );
  
    let config;
  
    config = {
      "key": key,
      "title": title,
      "filename": name,
      "pokiSDK": true,
      "debugPoki": false,
      "showFPS": false,
      "debug": false,
      "start": null,
      "width": 500,
      "height": 374,
      "x": 0,
      "y": 0,
      "w": "100%",
      "h": "100%",
      "stageScaleMode": null,
      "stageAlign": null,
      "progressParserWeigth": 1,
      "progress": {
        "direction": "lr",
        "back": "#222",
        "line": "#888",
        "rect": [
          0.1,
          0.4875,
          0.8,
          0.025
        ]
      },
      "skipFramesOfScene": null,
      "buttonPokiSDKActions": null,
      "retryButtonIDS": null,
      "retryButtonAction": null,
      "actionOnStop": null,
      "actionWhenRetryButtonEncountered": null,
      "filenameNoSdk": key,
      "binary": [
        {
          "name": "fonts.swf",
          "path": "assets/fonts.swf",
          "size": 30506
        },
        {
          "name": name,
          "path": "assets/" + file,
          "size": 0,
          "resourceType": "GAME"
        }
      ],
      "runtime": "js/runtime.js"
    };
  
    PokiSDK.setDebug(config.debugPoki);
  
    Loader.init(config);
  
    let onPokiInitComplete = (adBlocked) => {
      PokiSDK.adBlocked = adBlocked;
      PokiSDK.gameLoadingStart();
  
      Loader.runGame((fill) => {
        PokiSDK.gameLoadingProgress({
          percentageDone: fill,
          kbLoaded: 0,
          kbTotal: 0,
          fileNameLoaded: "",
          filesLoaded: 0,
          filesTotal: 0
        });
      }, (instance) => {
        PokiSDK.gameLoadingFinished();
      })
    }
  });
}
