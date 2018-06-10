<template>

  <div class="zap-slideout"
       :class="{ isOpen: isOpen }">
    <div class="zap-slideout-opener"
         @click="toggle">{{openerText}}</div>
    <ul class="zap-slideout-menu">
      <li class="zap-slideout-menu-item--small"
          v-for="item in smallMenu"  :id="item.routeId" @click ="setActualRoute">{{item.routeName}}

      </li>
      <li @click="showModal" class="zap-slideout-menu-item--small" >
        Dodaj nową ścieżkę
      </li>

    </ul>


    <modal
      v-show="isModalVisible"
      @close="closeModal"
    />

  </div>

</template>
<script>
  import auth from '../../auth'
  import modal from '../Modal/modal'
  import mapView from '../MapView'
  export default {
    components:{
      modal
    },
    name: 'zap-slideout',
    data:() => ({
      isModalVisible: false,
      openerText: 'Open',
      isOpen: false,
      smallMenu: [],
  }),
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    setActualRoute(e){
      var x = document.getElementById(this.$parent.$data.actualtripId);
       if(x!=null){
         x.style.color = "#ecf0f1";
         x.style.background = "#337ab7";
       }

      localStorage.setItem('actualtripId', e.target.id);
      this.$parent.$data.actualtripId = e.target.id;
      document.getElementById(this.$parent.$data.actualtripId).style.color="#337ab7";
      document.getElementById(this.$parent.$data.actualtripId).style.background="#ecf0f1";
      location.reload();

    },

    getRoutes: function () {
      this.$http.get('http://routeapi.azurewebsites.net/route',{
        headers: auth.getAuthHeader()
      }).then(function (data) {

        for (var i = 0; i < data.body.routes.length; i++) {
          var routeName = data.body.routes[i].name;
          var routeId = data.body.routes[i].routeId;
          this.smallMenu.push({routeName,routeId});

        }
      });
    },

    open() {
      this.openerText = 'Close';
      this.isOpen = true;
    },
    close() {
      this.openerText = 'Open';
      this.isOpen = false;
    },
    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }
  },

    beforeMount() {
      this.getRoutes();
    },
    updated(){
      document.getElementById(this.$parent.$data.actualtripId).style.color="#337ab7";
      document.getElementById(this.$parent.$data.actualtripId).style.background="#ecf0f1";

    }
  }
</script>


