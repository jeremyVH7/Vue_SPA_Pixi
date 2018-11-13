<template>
  <div>
    <div id="app">
      <div class='row' id='title-h1-div'><h1 id='title-h1'>{{ title }}</h1></div>
      <button class="btn btn-primary NavButton" v-on:click="pixiStop" tag="button">Stop</button>
      <button class="btn btn-primary NavButton" v-on:click="pixiStart" tag="button">Start</button>
      <button class="btn btn-primary NavButton" v-on:click="speedUp" tag="button">Speed Up!</button>
      <button class="btn btn-primary NavButton" v-on:click="slowDown" tag="button">Slow Down!</button>
      <button class="btn btn-primary NavButton" v-on:click="pauseVideo" tag="button">Pause Video</button>
      <button class="btn btn-primary NavButton" v-on:click="playVideo" tag="button">Play Video</button>
    </div>
  </div>
</template>

<script>
import {EventBus} from './components/EventBus.js'
import NavBar from './components/NavBar.vue'
import NavButton from './components/NavButton.vue'
import NavDropdown from './components/NavDropdown.vue'
import NavSearch from './components/NavSearch.vue'
import Home from './components/Home.vue'
import About from './components/About.vue'
import Error404 from './components/Error404.vue'
import * as PIXI from 'pixi.js'

var pixiApp = new PIXI.Application(800, 400, {backgroundColor : 0x9999bb});

export default {
  name: 'app',
  components: {
    NavBar: NavBar,
    NavButton: NavButton,
    Home: Home,
    About: About,
    Error404: Error404
  },
  data () {
    return {
      title: 'Pixi Test',
      speed: 0.1,
      image: '',
      video: '',
      videoBtn: '',
      buttonLinks: [
        ['/home', 'Home'],
        ['/about', 'About']

        // ['/error404', 'Error']
      ]
    }
  },
  methods: {
    videoTest: function () {
      var app = new PIXI.Application(800, 400, { transparent: true });
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

      this.videoBtn = button;
      // Add to the stage
      app.stage.addChild(this.videoBtn);

      // Listen for a click/tap event to start playing the video
      // this is useful for some mobile platforms. For example:
      // ios9 and under cannot render videos in PIXI without a
      // polyfill - https://github.com/bfred-it/iphone-inline-video
      // ios10 and above require a click/tap event to render videos
      // that contain audio in PIXI. Videos with no audio track do
      // not have this requirement
      this.videoBtn.on('pointertap', (event) => {
        this.onPlayVideo(app);
      });
    },
    onPlayVideo: function (app) {
      // create a video texture from a path
      // new smaller video file
      this.video = PIXI.Texture.fromVideo('./src/assets/test.mp4');

      // Don't need the button anymore
      this.videoBtn.destroy();
      // create a new Sprite using the video texture (yes it's that easy)
      var videoSprite = new PIXI.Sprite(this.video);

      // Stetch the fullscreen
      videoSprite.width = app.screen.width;
      videoSprite.height = app.screen.height;

      app.stage.addChild(videoSprite);
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
      this.pixiTicker(1)
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
    this.pixiVue()
    this.videoTest()
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
