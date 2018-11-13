<template>
  <div class="jumbotron text-center">
    <h1>{{headerText}}</h1>
    <p>{{pText}}</p>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  data () {
    return {
      headerText: '404',
      pText: 'Error page'
    }
  }
}
</script>

<style>
.jumbotron {
  color: #3A52C9;
}
</style>
