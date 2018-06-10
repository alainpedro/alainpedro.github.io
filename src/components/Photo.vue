<template>
  <div class="photo">
    <div class="menu col-sm-6 col-sm-offset-3">

      <br/>
      <h2>Photo list

        <router-link to="/photo/add">
          <button class="btn btn-primary" style="position:absolute; right:50px">add photo</button>
        </router-link>
      </h2>
      <table id="myTable" class="table table-inverse">
        <thead>
        <tr>
          <th>
          <td>Id</td>
          </th>
          <th>
          <td>Photo</td>
          </th>
          <th>
          <td>Operations</td>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="image in photos">
          <th scope="row">{{image.photoId+1}}</th>
          <img :id="image.photoId" :src="image.img.src" :alt="image.img.alt"/>
          <td>
            <button class="btn btn-danger" @click="photoDelete(image)">delete</button>
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
    name: 'photo',
    data() {
      return {
        photosImgs: [],
        photos: []
      }
    },
    methods: {
      photoDelete(data) {
        this.$http.delete('http://routeapi.azurewebsites.net/route/' + this.$parent.$data.actualtripId + '/point/' + data.pointId + '/photo/' + data.photoId, {
            headers: auth.getAuthHeader()
          }
        ).then(function () {
          window.location.reload(true);
        })
      },
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

                var img = new Image();
                that.photos.push({pointId: point.pointId, photoId: photosId.id, img: img});
                  fetch('http://routeapi.azurewebsites.net/route/' + that.$parent.$data.actualtripId + '/point/'
                    + point.pointId + '/photo/' + photosId.id + '/thumbnail', {
                    headers: auth.getAuthHeader()
                  })
                    .then((response) => response.blob())
                    .then((blob) => {
                      var imageUrl = URL.createObjectURL(blob);
                      var i;
                      for(i=0; i<that.photos.length; i++) {
                          if(document.getElementById(photosId.id)) {
                            document.getElementById(photosId.id).src = imageUrl;
                          }
                      }
                      that.sortTable();
                    });


//                  route/{routeid}/point/{pointid}/photo/{photoid}/thumbnail


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
      this.getPhotoList();
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
