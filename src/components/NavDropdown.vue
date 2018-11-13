<template>
  <select v-on:change="dropdownChange" style="color: black;">
    <option value="0" selected="selected">Make a Selection</option>
    <option v-for='i in dropdownItems' v-bind:value="i" v-text="i"></option>
  </select>
</template>

<script>
  import {EventBus} from './EventBus.js'
  export default {
    data () {
      return {
        dropMessage: ''
      }
    },
    props: ['dropdownItems'],
    methods: {
      dropdownChange: function(i) {
        //// Send some data after dropdown is changed
        var selectedValue = i.currentTarget.value;
        var selectedText = i.currentTarget.options[i.currentTarget.selectedIndex].text;

        if (selectedValue != 0) {
          this.dropMessage = selectedText + ' was just selected!';
        } else {
          this.dropMessage = '';
        }
        EventBus.$emit('dropdown-changed', this.dropMessage);
      }
    }
  }
</script>

<style>

</style>
