<template>
    <div class="input-group nav-search">
			<input type="text" class="form-control" v-bind:placeholder="searchText" name="search-term" id="search-term">
			<div class="input-group-btn">
				<button class="btn btn-default" type="submit" v-on:click.prevent="searchRun">{{ searchBtnText }}</button>
			</div>
		</div>
</template>

<script>
  import {EventBus} from './EventBus.js'
  export default {
    data () {
      return {
        searchMessage: ''
      }
    },
    props: ['searchText', 'searchBtnText'],
    methods: {
      searchRun: function() {
        //// Send some data after button is clicked
        var searchTerm = document.getElementById("search-term").value;
        this.searchMessage = '"' + searchTerm + '" was just searched!';
        EventBus.$emit('search-run', this.searchMessage);
      }
    }
  }
</script>

<style>

</style>
