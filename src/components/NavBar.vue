<template>
  <div id="nav-demo">
    <slot></slot>
  </div>
</template>

<script>
  import {EventBus} from './EventBus.js'
  export default {
    data () {
      return {
        NavText: "Heres a navbar and it's filled with components!"
      }
    }
  }
</script>

<style>
#vue-logo {
  height: 50px;
}
#nav-demo {
  background: #3A52C9;
}
#nav-test {
  height: 100px;
  width: 100px;
  background: red;
}
</style>
