<template>
  <div class="jumbotron text-center">
    <h1>{{headerText}}</h1>
    <p>{{pText}}</p>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      headerText: 'About Page',
      pText: 'Here is some information. This is the about page'
    }
  }
}
</script>

<style>
.jumbotron {
  color: white;
  background-color:	#578BC3;
  border: 2px solid white;
}
</style>
