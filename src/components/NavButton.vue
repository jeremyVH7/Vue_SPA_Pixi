<template>
    <router-link class="btn btn-primary NavButton" v-bind:to="routerTo" tag="button">{{buttonText}}</router-link>
</template>

<script>
  import {EventBus} from './EventBus.js'
  export default {
    data () {
      return {
        buttonMessage: ''
      }
    },
    props: ['buttonText', 'routerTo'],
    methods: {
    }
  }
</script>

<style>
.NavButton {
  min-width: 100px;
}
</style>
