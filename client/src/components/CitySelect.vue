<template>
<div :key="value" v-for="(value, id) in cities" @click="selectCity($event)">
  <a :data-id="id">{{value}}</a>
</div>

</template>

<script>

import {cities} from '../../data/cities.js';

export default {
  name: "CitySelect",

  data() {
    return {
      cities: cities,
    }
  },

  methods: {
    selectCity(e) {
      let id = e.target.dataset.id;
      this.$emit('current-city', id)
    },
  }
}
</script>

<style scoped>

</style>