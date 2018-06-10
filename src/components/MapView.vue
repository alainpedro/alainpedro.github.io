<template>
  <div class="poster col-xs-12">
    <h2>Trip view</h2>
    <br>
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: calc(100vh - 280px)"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :label="m.label"
        :clickable="true"
        @click="toggleInfoWindow(m,index)"
      ></gmap-marker>
      <GmapPolyline v-if="path" :path="path"/>
      <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen"
                        @closeclick="infoWinOpen=false">
        <td v-for="(d, index) in infoContentPhotos">
          <img class="minigallery" :src=d.mini @click="clickPhoto(index,d)">
        </td>
        <div></div>
        <td v-for="(d, index) in infoContentVideos">
          <img class="minigallery" :src=d.mini @click="clickVideo(index,d)">
        </td>

      </gmap-info-window>
    </gmap-map>
  </div>
</template>

<script>
  import auth from '../auth/'

  export default {
    name: "MapView",
    data() {
      return {
        points: [],
        center: {lat: 52.2296756, lng: 21.012228700000037},
        markers: [],
        path: [],
        photos: [],
        videos: [],
        places: [],
        currentPlace: null,
        infoContentPhotos: [],
        infoContentVideos: [],
        infoWindowPos: {
          lat: 0,
          lng: 0
        },
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        infoWinOpen: false,

      };
    },

    mounted() {

      this.geolocate();
      this.getData();

    },

    methods: {
      getPhotoList() {
        var url = 'http://routeapi.azurewebsites.net/route/' + this.$parent.$data.actualtripId + '/point';
        this.$http.get(url, {
          headers: auth.getAuthHeader()
        }).then(function (data) {
          var points = data.body.points;
          var that = this;
          points.forEach(function (point) {
            that.$http.get('http://routeapi.azurewebsites.net/route/' + that.$parent.$data.actualtripId + '/point/' + point.pointId + '/photo', {
              headers: auth.getAuthHeader()
            }).then(function (data) {
              point.photosId = data.body.photos;
              point.photosId.forEach(function (photosId) {

                fetch('http://routeapi.azurewebsites.net/route/' + that.$parent.$data.actualtripId + '/point/'
                  + point.pointId + '/photo/' + photosId.id + '/thumbnail', {
                  headers: auth.getAuthHeader()
                })
                  .then((response) => response.blob())
                  .then((blob) => {
                    var imageUrl = URL.createObjectURL(blob);
                    that.photos.push({pointId: point.pointId, photoId: photosId.id, mini: imageUrl});
                    that.photos.sort(function(a, b){
                      if(a.photoId < b.photoId) return -1;
                      if(a.photoId > b.photoId) return 1;
                      return 0;
                    });
                  });


//                  route/{routeid}/point/{pointid}/photo/{photoid}/thumbnail


              });

            });
          });
        });


      },
      getVideoList() {
        var url = 'http://routeapi.azurewebsites.net/route/' + this.$parent.$data.actualtripId + '/point';
        this.$http.get(url, {
          headers: auth.getAuthHeader()
        }).then(function (data) {
          var points = data.body.points;
          var that = this;
          points.forEach(function (point) {
            that.$http.get('http://routeapi.azurewebsites.net/route/' + that.$parent.$data.actualtripId + '/point/' + point.pointId + '/video', {
              headers: auth.getAuthHeader()
            }).then(function (data) {
              console.log(data);
              point.videosId = data.body.videos;
              point.videosId.forEach(function (videosId) {
                that.videos.push({pointId: point.pointId, videoId: videosId.id, mini: "http://videopromotion.club/assets/images/default-video-thumbnail.jpg"});
                that.videos.sort(function(a, b){
                  if(a.videoId < b.videoId) return -1;
                  if(a.videoId > b.videoId) return 1;
                  return 0;
                });

              });

            });
          });
        });


      },
      getData: function () {
        var url = 'http://routeapi.azurewebsites.net/route/' + this.$parent.$data.actualtripId + '/point';
        this.$http.get(url, {
          headers: auth.getAuthHeader()
        }).then(function (data) {
          this.points = data.body.points;

          var tab = [];
          this.points.forEach(function (point) {
            tab.push(
              {
                position: {
                  lat: point.latitudecoord_x,
                  lng: point.longitudecoord_y
                },
                label: point.pointId.toString(),
              }
            )
          });
          this.markers = tab;
          if (this.markers.length > 1) {
            this.center = {lat: this.markers[0].position.lat, lng: this.markers[0].position.lng};
          }
          this.makePaths();
          this.getPhotoList();
          this.getVideoList();
        });
      },

      makePaths() {
        var localpath = [];
        this.markers.forEach(function (marker) {
          localpath.push(
            {
              lat: marker.position.lat,
              lng: marker.position.lng
            },
          )
        });
        this.path = localpath;
      },


      setPlace(place) {
        this.currentPlace = place;
      },
      addMarker() {
        if (this.currentPlace) {
          const marker = {
            lat: this.currentPlace.geometry.location.lat(),
            lng: this.currentPlace.geometry.location.lng()
          };
          this.markers.push({position: marker});
          this.places.push(this.currentPlace);
          this.center = marker;
          this.currentPlace = null;
        }
      },
      geolocate: function () {
        navigator.geolocation.getCurrentPosition(position => {

        });
      },
      clickPhoto: function (index,d) {
        fetch('http://routeapi.azurewebsites.net/route/' + this.$parent.$data.actualtripId + '/point/'
          + this.photos[d.photoId].pointId + '/photo/' + d.photoId, {
          headers: auth.getAuthHeader()
        })
          .then((response) => response.blob())
          .then((blob) => {
            var img = new Image();
            img.src = URL.createObjectURL(blob);
            var w = window.open("");
            w.document.write(img.outerHTML);
          });
      },
      clickVideo: function (index,d) {
        fetch('http://routeapi.azurewebsites.net/route/' + this.$parent.$data.actualtripId + '/point/'
          + this.videos[d.videoId].pointId + '/video/' + d.videoId, {
          headers: auth.getAuthHeader()
        })
          .then((response) => response.blob())
          .then((blob) => {

            var video = document.createElement("video");
            video.controls = true;
            video.style = "max-width: 80%;min-width: 30%;";
            video.src = URL.createObjectURL(blob);
            var w = window.open("");
            w.document.write(video.outerHTML);



//            var url = URL.createObjectURL(blob);
//            var a = document.createElement("a");
//            document.body.appendChild(a);
//            a.style = "display: none";
//            a.href = url;
//            a.download = "video.mp4";
//            a.click();
//            window.URL.revokeObjectURL(url);
          });
      },

      toggleInfoWindow: function (marker, idx) {
        var i;
        this.infoContentPhotos = [];
        this.infoContentVideos = [];
        for (i = 0; i < this.photos.length; i++) {
          if (idx == this.photos[i].pointId) {
            this.infoContentPhotos.push(this.photos[i]);
          }
        }
        for (i = 0; i < this.videos.length; i++) {
          if (idx == this.videos[i].pointId) {
            this.infoContentVideos.push(this.videos[i]);
          }
        }

        this.infoWindowPos = marker.position;
        //check if its the same marker that was selected if yes toggle
        if (this.currentMidx == idx) {
          this.infoWinOpen = !this.infoWinOpen;
        }
        //if different marker set infowindow to open and reset current marker index
        else {
          this.infoWinOpen = true;
          this.currentMidx = idx;
        }
      }


    }
  };
</script>

<style>
  td > img {
    height: 15vh;
    padding: 10px 4px;
    opacity: 0.8;
    transition: .5s ease;
  }

  td > img:hover {
    padding: 0;
    opacity: 1;

  }
</style>
