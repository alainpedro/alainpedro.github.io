<template>
  <div class="tripRoute">
    <div class="menu col-sm-6 col-sm-offset-4">
      <h2>Trip route map</h2>
      <table class="table table-inverse">
        <thead>
          <tr>
             <th><td>Id</td></th>
             <th><td>Name</td></th>
             <th><td>Operations</td></th>
           </tr>
         </thead>
         <tbody>
           <tr v-for="d in tripRoutes">
             <th scope="row">{{d.id}}</th>
             <td>{{ d.name }}</td>
             <td>
               <button class="btn btn-danger" @click="tripRouteDelete(d.id)">delete</button>
             </td>
           </tr>
         </tbody>
       </table>
      <br/><br/><br/>
      <router-link to="/tripRoute/add">
        <button class="btn btn-primary">add Trip route</button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import auth from '../auth/'

  export default {
    name: 'TripRoute',

    data() {
      return {
        tripRoutes: [
          {
            id: 1,
            name: "Barcelona 2018"
          },
          {
            id: 2,
            name: "Toruń 2015"
          }
        ]
      }
    },
    methods: {
      tripRouteDelete(id) {
        this.$http.delete('https://triproute/delete', {
            body: {
              "id": id
            },
            headers: auth.getAuthHeader()
          }
        )


          .then(function (data) {

            this.getDriverList();

          })
      },


      getTripRouteList() {
        this.$http.get('https://triproute/getAll', {
          headers: auth.getAuthHeader()
        }).then(function (data) {
          this.tripRoutes = data.body;
        })
      }

    },
    beforeMount() {
      this.getTripRouteList();
    }

  }
</script>
