<template>
  <div class="jumbotron text-center">
    <h1>{{headerText}}</h1>
    <p>{{pText}}</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      headerText: 'Home Page',
      pText: 'Here is a killer home page'
    }
  }
}
</script>

<style>
.jumbotron {
  color: white;
  background-color: 	#578BC3;
  border: 2px solid white;
}
</style>
