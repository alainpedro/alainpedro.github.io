<template>
  <div class="vvideo">
    <div class="menu col-sm-6 col-sm-offset-3">

      <br/>
      <h2>video list


        <router-link to="/video/add">
          <button class="btn btn-primary" style="position:absolute; right:50px">add video</button>
        </router-link>
      </h2>
      <table id="myTable" class="table table-inverse">
        <thead>
        <tr>
          <th>
          <td>Id</td>
          </th>
          <th>
          <td>video</td>
          </th>
          <th>
          <td>Operations</td>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="v in videos">
          <th scope="row">{{v.videoId + 1}}</th>
          <img :id="v.videoId" :src="v.img.src" :alt="v.img.alt"/>
          <td>
            <button class="btn btn-danger" @click="videoDelete(v)">delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import auth from '../auth/'

  export default {
    name: 'video',
    data() {
      return {
        videosImgs: [],
        videos: []
      }
    },
    methods: {
      videoDelete(data) {
        this.$http.delete('http://routeapi.azurewebsites.net/route/' + this.$parent.$data.actualtripId + '/point/' + data.pointId + '/video/' + data.videoId, {
            headers: auth.getAuthHeader()
          }
        ).then(function () {
          window.location.reload(true);
        })
      },
      getvideoList() {
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
              point.videosId = data.body.videos;
              point.videosId.forEach(function (videosId) {

                var img = new Image();
                that.videos.push({pointId: point.pointId, videoId: videosId.id, img: img});
                fetch('http://routeapi.azurewebsites.net/route/' + that.$parent.$data.actualtripId + '/point/'
                  + point.pointId + '/video/' + videosId.id + '/thumbnail', {
                  headers: auth.getAuthHeader()
                })
                  .then((response) => response.blob())
                  .then((blob) => {
                    var i;
                    for (i = 0; i < that.videos.length; i++) {
                      if (document.getElementById(videosId.id)) {
                        document.getElementById(videosId.id).src = "http://videopromotion.club/assets/images/default-video-thumbnail.jpg";
                      }
                    }
                    that.sortTable();
                  });


//                  route/{routeid}/point/{pointid}/video/{videoid}/thumbnail


              });

            });
          });
        });


      },

      sortTable() {

        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("myTable");
        switching = true;
        /*Make a loop that will continue until
         no switching has been done:*/
        while (switching) {
          //start by saying: no switching is done:
          switching = false;
          rows = table.getElementsByTagName("TR");
          /*Loop through all table rows (except the
           first, which contains table headers):*/
          for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
             one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TH")[0];
            y = rows[i + 1].getElementsByTagName("TH")[0];
            //check if the two rows should switch place:
            if (Number(x.innerHTML) > Number(y.innerHTML)) {
              //if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
          if (shouldSwitch) {
            /*If a switch has been marked, make the switch
             and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
          }
        }
      }
    },

    beforeMount() {
      this.getvideoList();
    },

    afterMount() {
      console.log();
    }
  }
</script>

<style>
  tr > img {
    max-height: 100px;
    padding: 10px;
  }
</style>
