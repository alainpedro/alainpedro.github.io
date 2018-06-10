<template>
  <div class="video">
    <div class="menu col-sm-6 col-sm-offset-3">
      <br/>
      <h2>Video list      <router-link to="/photo/add">
        <button class="btn btn-primary" style="position:absolute; right:50px">add video</button>
      </router-link>
      </h2>
      <table class="table table-inverse">
        <thead>
        <tr>
          <th><td>Id</td></th>
          <th><td>Thumbnail</td></th>
          <th><td>Operations</td></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="d in videos">
          <th scope="row">{{d.id}}</th>
          <img :src=d.videoURL >
          <td>
            <button class="btn btn-danger" @click="photoDelete(d.id)">delete</button>
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
        videos: [
          {
            id: 1,
            videoURL: "https://cdn-dcp.avt.pl/i/images/6/8/8/_src_12688-jak_robic_ostre_zdjecia_01.jpg"
          },
          {
            id: 2,
            videoURL: "http://bi.gazeta.pl/im/31/81/15/z22552369V,Zwierzeta-sfotografowane-przez-Joela-Sartorea-podc.jpg"
          }
        ]
      }
    },
    methods: {
      videoDelete(id) {
        this.$http.delete('https://morning-escarpment-49088.herokuapp.com/video/delete', {
            body: {
              "id": id
            },
            headers: auth.getAuthHeader()
          }
        )


          .then(function (data) {

            this.getVideoList();

          })
      },


      getVideoList() {
        this.$http.get('https://morning-escarpment-49088.herokuapp.com/video/getAll', {
          headers: auth.getAuthHeader()
        }).then(function (data) {
          this.videos = data.body;
        })
      }

    },
    beforeMount() {
      this.getVideoList();
    }

  }
</script>

<style>
  tr > img {
    max-height:100px;
    padding: 10px;
  }
</style>

