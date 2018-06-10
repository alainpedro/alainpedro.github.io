<template>
  <div class="poster col-xs-8 col-xs-offset-2">
    <div class="menu col-xs-12">

      <br/>
      <h2>Poster generate</h2>
      <img style="width:100%" id="posterimg"/>
      <button id="downloadButton" class="btn btn-primary" style="margin:15px; display: none" @click="downloadPoster()">download</button>

      <div id="loader-wrapper">
        <div id="loader"></div>
        <h3>Please wait, your poster is being generated</h3>
        <h4>Usually, it takes a few seconds...</h4>
      </div>

    </div>
  </div>
</template>

<script>
  import auth from '../auth/'
  export default {
    name: 'poster',
    data() {
      return {}
    },
    methods: {
      generatePosterJSON() {
        this.$http.post('http://routeapi.azurewebsites.net/route/' + this.$parent.$data.actualtripId + '/poster', {
          headers: auth.getAuthHeader()
        }).then(setTimeout(this.getPoster(), 1000));
      },

      getPoster() {
        fetch('http://routeapi.azurewebsites.net/route/' + this.$parent.$data.actualtripId + '/poster', {
          headers: auth.getAuthHeader()
        })
          .then((response) => response.blob())
          .then((blob) => {
            var imageUrl = URL.createObjectURL(blob);
            document.getElementById("posterimg").src = imageUrl;
            document.getElementById("loader-wrapper").style.display = "none";
            document.getElementById("downloadButton").style.display = "inline";
          });
      },
      downloadPoster() {
        var link = document.createElement('a');
        link.href = document.getElementById("posterimg").src;
        link.download = 'Poster.jpg';
        link.style = "display: none";
        document.body.appendChild(link);
        link.click();
      }
    },
    beforeMount() {
      this.generatePosterJSON();
    }
  }
</script>

<style>

  #loader-wrapper {
    margin-top: 150px;
    margin-bottom: 50px;
  }

  #loader {
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 150px;
    height: 150px;
    margin: -75px 0 0 -75px;
    border-radius: 50%;
    border: 6px solid transparent;
    border-top-color: #6ad168;

    -webkit-animation: spin 2s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
    animation: spin 2s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
  }

  #loader:before {
    content: "";
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #3498db;

    -webkit-animation: spin 3s ease-in-out infinite; /* Chrome, Opera 15+, Safari 5+ */
    animation: spin 3s ease-in-out infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
  }

  #loader:after {
    content: "";
    position: absolute;
    top: 25px;
    left: 25px;
    right: 25px;
    bottom: 25px;
    border-radius: 50%;
    border: 5px solid transparent;
    border-top-color: #FFD6A2;

    -webkit-animation: spin 1.5s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
    animation: spin 1.5s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
  }

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg); /* Chrome, Opera 15+, Safari 3.1+ */
      -ms-transform: rotate(0deg); /* IE 9 */
      transform: rotate(0deg); /* Firefox 16+, IE 10+, Opera */
    }
    100% {
      -webkit-transform: rotate(360deg); /* Chrome, Opera 15+, Safari 3.1+ */
      -ms-transform: rotate(360deg); /* IE 9 */
      transform: rotate(360deg); /* Firefox 16+, IE 10+, Opera */
    }
  }

  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg); /* Chrome, Opera 15+, Safari 3.1+ */
      -ms-transform: rotate(0deg); /* IE 9 */
      transform: rotate(0deg); /* Firefox 16+, IE 10+, Opera */
    }
    100% {
      -webkit-transform: rotate(360deg); /* Chrome, Opera 15+, Safari 3.1+ */
      -ms-transform: rotate(360deg); /* IE 9 */
      transform: rotate(360deg); /* Firefox 16+, IE 10+, Opera */
    }
  }


</style>
