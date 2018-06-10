<template>
  <div class="menu col-xs-8 col-xs-offset-2">
    <router-link to="/photo" class="col-xs-4">
      <div id="b1" class="menuButton"><span>Photos</span></div>
    </router-link>
    <router-link to="/video" class="col-xs-4">
      <div id="b2" class="menuButton"><span>Videos</span></div>
    </router-link>
      <router-link to="/poster" class="col-xs-4">
        <div id="b3" class="menuButton"><span>Poster</span></div>
      </router-link>
      <router-link to="/presentation" class="col-xs-8">
        <div id="b4" class="menuButton"><span>Presentation</span></div>
      </router-link>
      <router-link to="/mapView" class="col-xs-12">
        <div id="b5" class="menuButton"><span>Trip View</span></div>
      </router-link>
    </div>
  </div>
</template>

<script>

  export default {
    data:()=>({
    }),
  }
</script>

<style>

  .menu {
    padding-top:30px;
  }

  .menuButton {
    height: calc(110px + 10vh);
    background-size: cover;
    background-position: center center;
    transition: opacity 0.6s ease;
  }
  .menuButton:hover {
    opacity: 0.7;
  }

  #b3 > span{
    position: absolute;
    bottom: calc(-95px - 10vh);
  }

  .menuButton > span{
    position: absolute;
    bottom: 15px;
    right: 15px;
    color: #fff;
    text-shadow: 1px 1px 3px black;
    font-size: 27px;
    font-weight: 500;
    line-height: 34px;
  }


  #b1 {
    background-image:url("../assets/photo.jpg");
  }
  #b2 {
    background-image:url("../assets/video.jpg");
  }
  #b3 {
    background-image:url("../assets/poster.jpg");
    height: calc(220px + 20vh);
    margin-bottom: calc(-110px - 10vh);
  }
  #b4 {
    background-image:url("../assets/presentation.jpg");
  }
  #b5 {
    background-image:url("../assets/mapview.jpg");
  }
  a {
    padding: 0 !important;
  }
</style>
