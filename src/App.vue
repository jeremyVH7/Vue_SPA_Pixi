<template>
  <div>
    <div id="app">
      <div class='row' id='title-h1-div'><h1 id='title-h1'>{{ title }}</h1></div>
      <!-- <h3>Spinning Logo Controls</h3>
      <button class="btn btn-primary NavButton" v-on:click="pixiStop" tag="button">Stop</button>
      <button class="btn btn-primary NavButton" v-on:click="pixiStart" tag="button">Start</button>
      <button class="btn btn-primary NavButton" v-on:click="speedUp" tag="button">Speed Up</button>
      <button class="btn btn-primary NavButton" v-on:click="slowDown" tag="button">Slow Down</button>
      <hr> -->
      <!-- <h3>Video Controls</h3>
      <button class="btn btn-primary NavButton" v-on:click="volumeUp" tag="button">Volume Up</button>
      <button class="btn btn-primary NavButton" v-on:click="volumeDown" tag="button">Volume Down</button>
      <button class="btn btn-primary NavButton" v-on:click="muteVideo" tag="button">Mute</button>
      <button class="btn btn-primary NavButton" v-on:click="fullScreen" tag="button">Fullscreen</button> -->
    </div>
  </div>
</template>

<script>
import {EventBus} from './components/EventBus.js'
import * as PIXI from 'pixi.js'

// For spinning logo
var pixiApp = new PIXI.Application(800, 400, {backgroundColor : 0x9999bb});

export default {
  name: 'app',
  components: {
  },
  data () {
    return {
      title: 'Pixi.js Test',
      speed: 0.1,
      image: '',
      videoApp: '',
      videoSprite: '',
      video: '',
      startBtn: '',
      playBtn: '',
      pauseBtn: '',
      controlBtn: '',
      muteBtn: '',
      vUpBtn: '',
      vDownBtn: '',
      replayBtnShown: false,
      percentDone: '',
      audioLevel: .5,
      muted: false,
      isFullScreen: false,
      videoPlaying: false
    }
  },
  methods: {
    videoTest: function () {
      var app = new PIXI.Application(960, 540, { transparent: true });
      document.body.appendChild(app.view);

      // Create play button that can be used to trigger the video
      var button = new PIXI.Graphics()
          .beginFill(0x0, 0.5)
          .drawRoundedRect(0, 0, 100, 100, 10)
          .endFill()
          .beginFill(0xffffff)
          .moveTo(36, 30)
          .lineTo(36, 70)
          .lineTo(70, 50);

      // Position the button
      button.x = (app.screen.width - button.width) / 2;
      button.y = (app.screen.height - button.height) / 2;

      // Enable interactivity on the button
      button.interactive = true;
      button.buttonMode = true;

      this.startBtn = button;
      // Add to the stage
      app.stage.addChild(this.startBtn);

      // Listen for a click/tap event to start playing the video
      // this is useful for some mobile platforms. For example:
      // ios9 and under cannot render videos in PIXI without a
      // polyfill - https://github.com/bfred-it/iphone-inline-video
      // ios10 and above require a click/tap event to render videos
      // that contain audio in PIXI. Videos with no audio track do
      // not have this requirement
      this.startBtn.on('pointertap', (event) => {
        this.onPlayVideo(app);
      });
      this.videoApp = app;
    },
    onPlayVideo: function (app) {
      this.videoPlaying = true;
      // Pause button - transparent button same size as video app
      var pauseButton = new PIXI.Graphics()
          .beginFill(0x0, 0.0)
          .drawRoundedRect(0, 0, 960, 540, 10)
          .endFill();

      // Position the pauseButton (centered)
      pauseButton.x = (app.screen.width - pauseButton.width) / 2;
      pauseButton.y = (app.screen.height - pauseButton.height) / 2;

      // Enable interactivity on the pauseButton
      pauseButton.interactive = true;
      pauseButton.buttonMode = true;
      this.pauseBtn = pauseButton;

      // create a video texture from a path
      this.video = PIXI.Texture.fromVideo('./src/assets/test.mp4');
      // Set starting volume level
      this.video.baseTexture.source.volume = this.audioLevel;
      // Don't need the start button anymore
      // this.startBtn.width = 0;

      // create a new Sprite using the video texture
      var videoSprite = new PIXI.Sprite(this.video);

      // Set video to full app size
      videoSprite.width = app.screen.width;
      videoSprite.height = app.screen.height;

      this.videoSprite = videoSprite;

      app.stage.addChild(videoSprite);
      app.stage.addChild(this.pauseBtn);
      this.video.baseTexture.source.controls = true;


      ///////////////// Controls
      // Progress bar
      var bar = new PIXI.Graphics()
          .beginFill(0xffffff, 0.5)
          .drawRoundedRect(0, 0, app.screen.width, 5, 5)
          .endFill();
      app.stage.addChild(bar);

      bar.y = app.screen.height - 50;

      // Update progress
      this.video.on("update", function(e) {
        this.percentDone = (100 / e.baseTexture.source.duration) * e.baseTexture.source.currentTime;
        //percent to pixels
        var progress = app.screen.width * (this.percentDone / 100)
        bar.width = progress;
        if (this.percentDone > 99) {
          // Replay button
          var replay = new PIXI.Graphics()
          .beginFill(0x0, 0.5)
          .drawRoundedRect(0, 0, 100, 100, 10)
          .endFill()
          .beginFill(0xffffff)
          .moveTo(36, 30)
          .lineTo(36, 70)
          .lineTo(70, 50);

          // Position the button
          replay.x = (app.screen.width - replay.width) / 2;
          replay.y = (app.screen.height - replay.height) / 2;

          // Enable interactivity on the button
          replay.interactive = true;
          replay.buttonMode = true;

          app.stage.addChild(replay);

          this.replayBtnShown = true;

          replay.on('pointertap', (event) => {
            console.log('replay');

          });
        }

      });

      // Play/Pause button -
      var controlButton = new PIXI.Graphics()
          .beginFill(0x0, 0.5)
          .drawRect(0, 0, 40, 40, 10)
          .endFill()
          .beginFill(0xffffff)
          .moveTo(14, 12)
          .lineTo(14, 28)
          .lineTo(28, 20);
      this.controlBtn = controlButton;
      app.stage.addChild(this.controlBtn);

      // Position the controlButton
      controlButton.x = 0;
      controlButton.y = app.screen.height - 40;

      // Enable interactivity on the controlButton
      controlButton.interactive = true;
      controlButton.buttonMode = true;

      this.controlBtn.on('pointertap', (event) => {
        if (this.videoPlaying === true) {
          this.pauseVideo();
          this.videoPlaying = false;
        } else {
          this.playVideo();
          this.videoPlaying = true;
        }
      });

      // full screen button -
      var fsButton = new PIXI.Graphics()
          .beginFill(0x0, 0.5)
          .drawRect(0, 0, 40, 40, 10)
          .endFill();
      this.fsBtn = fsButton;
      app.stage.addChild(this.fsBtn);

      // Position the Button
      fsButton.x = app.screen.width - 40;
      fsButton.y = app.screen.height - 40;

      // Enable interactivity on the Button
      fsButton.interactive = true;
      fsButton.buttonMode = true;

      this.fsBtn.on('pointertap', (event) => {
        this.fullScreen();
      });

      // mute button -
      var muteButton = new PIXI.Graphics()
          .beginFill(0x0, 0.5)
          .drawRect(0, 0, 40, 40, 10)
          .endFill();
      this.muteBtn = muteButton;
      app.stage.addChild(this.muteBtn);

      // Position the Button
      muteButton.x = app.screen.width / 2;
      muteButton.y = app.screen.height - 40;

      // Enable interactivity on the Button
      muteButton.interactive = true;
      muteButton.buttonMode = true;

      this.muteBtn.on('pointertap', (event) => {
        this.muteVideo();
      });

      // volume up button -
      var vUpButton = new PIXI.Graphics()
          .beginFill(0x0, 0.5)
          .drawRect(0, 0, 40, 40, 10)
          .endFill();
      this.vUpBtn = vUpButton;
      app.stage.addChild(this.vUpBtn);

      // Position the Button
      vUpButton.x = app.screen.width / 2 + 45;
      vUpButton.y = app.screen.height - 40;

      // Enable interactivity on the Button
      vUpButton.interactive = true;
      vUpButton.buttonMode = true;

      this.vUpBtn.on('pointertap', (event) => {
        this.volumeUp();
      });

      // volume down button -
      var vDownButton = new PIXI.Graphics()
          .beginFill(0x0, 0.5)
          .drawRect(0, 0, 40, 40, 10)
          .endFill();
      this.vDownBtn = vDownButton;
      app.stage.addChild(this.vDownBtn);

      // Position the Button
      vDownButton.x = app.screen.width / 2 + 90;
      vDownButton.y = app.screen.height - 40;

      // Enable interactivity on the Button
      vDownButton.interactive = true;
      vDownButton.buttonMode = true;

      this.vDownBtn.on('pointertap', (event) => {
        this.volumeDown();
      });




      this.pauseBtn.on('pointertap', (event) => {
        if (this.videoPlaying === true) {
          this.pauseVideo();
          this.videoPlaying = false;
        } else {
          this.playVideo();
          this.videoPlaying = true;
        }

      });
    },
    showStartButton: function () {
      app.stage.addChild(this.startBtn);
    },
    volumeUp: function () {
      this.audioLevel = this.audioLevel + .1;
      if (this.audioLevel > 1) this.audioLevel = 1;
      this.video.baseTexture.source.volume = this.audioLevel;
    },
    volumeDown: function () {
      this.audioLevel = this.audioLevel - .1;
      if (this.audioLevel < 0) this.audioLevel = 0;
      this.video.baseTexture.source.volume = this.audioLevel;
    },
    muteVideo: function () {
      if (this.muted === false) {
        this.muted = true;
        this.video.baseTexture.source.volume = 0;
      } else {
        this.muted = false;
        this.video.baseTexture.source.volume = this.audioLevel;
      }
    },
    fullScreen: function () {
      /////// Is there a way to do it within pixi?

      // this.videoApp.renderer.resize(screen.width, screen.height);
      // this.videoSprite.width = this.videoApp.screen.width;
      // this.videoSprite.height = this.videoApp.screen.height;

      // Target the canvas/element and resize
      var theCanvas = document.querySelectorAll('canvas');

      if (this.isFullScreen === false) {
        if (theCanvas[0].requestFullscreen) {
          theCanvas[0].requestFullscreen();
        } else if (theCanvas[0].msRequestFullscreen) {
          theCanvas[0].msRequestFullscreen();
        } else if (theCanvas[0].mozRequestFullScreen) {
          theCanvas[0].mozRequestFullScreen();
        } else if (theCanvas[0].webkitRequestFullscreen) {
          theCanvas[0].webkitRequestFullscreen();
        }
        this.isFullScreen = true;
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
        this.isFullScreen = false;
      }
    },
    pauseVideo: function () {
      this.video.baseTexture.source.pause();
    },
    playVideo: function () {
      this.video.baseTexture.source.play();
    },
    pixiVue: function () {

      document.body.appendChild(pixiApp.view);

      // create a new Sprite from an image path
      var logo = PIXI.Sprite.fromImage('./src/assets/logo.png')
      // center the sprite's anchor point
      logo.anchor.set(0.5);

      // move the sprite to the center of the screen
      logo.x = pixiApp.screen.width / 2;
      logo.y = pixiApp.screen.height / 2;

      pixiApp.stage.addChild(logo);

      this.image = logo
      // this.pixiTicker(1)
    },
    pixiTicker: function (dir) {
      var speed = this.speed
      var image = this.image
      console.log(speed)
      // Listen for animate update
      pixiApp.ticker.add(function(delta) {
          // delta is 1 if running at 100% performance
          // creates frame-independent transformation
          if (dir === 1) image.rotation += speed * delta;
          if (dir === 2) image.rotation -= speed * delta;
      });
    },
    pixiStop: function () {
      pixiApp.ticker.stop()
    },
    pixiStart: function () {
      pixiApp.ticker.start()
    },
    speedUp: function () {
      this.speed = 0.1
      this.pixiTicker(1)
    },
    slowDown: function () {
      this.speed = 0.1
      this.pixiTicker(2)
    }
  },
  mounted: function () {
    this.videoTest()
    // this.pixiVue()
  },
  created: function () {
    // EventBus.$on('button-clicked', this.buttonClicked);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
}

h1, h2 {
  font-weight: normal;
  padding-left: 40px;
  position: relative;
}

body {
  background: grey;
}

ul {
  list-style-type: none;
}

li {
  display: inline-block;
  padding-right: 5px;
}
.d-btn {
  background: blue;
  /* height: 100px;
  width: 100%; */
  cursor: pointer;
}
#nav-demo {
  position: relative;
}
body canvas {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
