<template>
    <div class="google-map" :id="mapName"></div>
</template>
<script>
  export default {
    name: 'google-map',
    props: ['name'],
    data: function () {
      return {
        mapName: this.name + "-map",
      }
    }
  };
</script>

<style scoped>
  .google-map {
    width: 70%;
    height: 100%;
    margin: 0 auto;
    background: gray;
    position: absolute;
    float: left;
  }
</style>
