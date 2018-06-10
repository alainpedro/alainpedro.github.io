<template>
  <div class="photo">
    <div class="menu col-sm-6 col-sm-offset-3">

      <br/>
      <h2>Photo list      <router-link to="/photo/add">
        <button class="btn btn-primary" style="position:absolute; right:50px">add photo</button>
      </router-link>
</h2>
      <table class="table table-inverse">
        <thead>
        <tr>
          <th><td>Id</td></th>
          <th><td>Photo</td></th>
          <th><td>Operations</td></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="image in photos">
          <th scope="row">{{image.photoId}}</th>
          <img :src="image.img.src" :alt="image.img.alt" />
          <td>
            <button class="btn btn-danger" @click="photoDelete(image.photoId)">delete</button>
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
        photosImgs:[],
        photos: []
      }
    },
    methods: {
      photoDelete(id) {
        this.$http.delete('https://morning-escarpment-49088.herokuapp.com/photo/delete', {
            body: {
              "id": id
            },
            headers: auth.getAuthHeader()
          }
        )
          .then(function (data) {
            this.getPhotoList();
          })
      },
      getPhotoList() {
        var url = 'http://routeapi.azurewebsites.net/route/' +this.$parent.$data.actualtripId +'/point';
        this.$http.get(url,{
          headers: auth.getAuthHeader()
        }).then(function (data) {
          var points = data.body.points;
          var that = this;
          points.forEach(function(point) {
            that.$http.get('http://routeapi.azurewebsites.net/route/' + that.$parent.$data.actualtripId + '/point/' + point.pointId + '/photo', {
              headers: auth.getAuthHeader()
            }).then(function (data) {
              point.photosId = data.body.photos;
              point.photosId.forEach(function (photosId) {
                    that.$http.get('http://routeapi.azurewebsites.net/route/' + that.$parent.$data.actualtripId + '/point/'
                    + point.pointId + '/photo/' + photosId.id + '/thumbnail', {
                    headers: auth.getAuthHeader()

                  }).then(function (data) {
                    var blob = new Blob([data.body], { type: "image/png" });
                    console.log(blob);
                    var url = URL.createObjectURL(blob);
                    var img = new Image();
                    img.src = url;
                    console.log(img.src);
                    this.photos.push({photoId:photosId.id,img:img});


                  });

//                  route/{routeid}/point/{pointid}/photo/{photoid}/thumbnail


                });

              });
            });
          });



      }
    },

    beforeMount() {
      this.getPhotoList();
    }
  }
</script>

<style>
  tr > img {
    max-height:100px;
    padding: 10px;
  }
</style>
