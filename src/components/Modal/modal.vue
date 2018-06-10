<script>
  import auth from '../../auth'
  import * as axios from 'axios';
  import zapslideout from '../SlideMenu/zapslideout'
  export default {
    name: 'modal',
    data() {
      return {
        routeName:'',
        file:'',
        blobfile:'',
    }},
    methods: {
      close() {
        this.$emit('close');
      },
      loadFile: function(){
          this.file = document.getElementById('file').files[0];
      },
      submitNewRoute: function () {
        var file = this.file;
        var fr = new FileReader();
        fr.onload = function () {
          console.log(fr.result);
          this.blobfile = fr.result;

        };

        var data = new FormData();
        console.log(localStorage.getItem('file'));
        data.append('file',this.file,this.file.name);
        data.append('name',this.routeName);
        var promise = axios.post('http://routeapi.azurewebsites.net/route',data,{
          headers: auth.getAuthHeader()
        }).then(function (data) {
          window.location.reload(true);

        });
      }
    }}
</script>
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
           role="dialog"
           aria-labelledby="modalTitle"
           aria-describedby="modalDescription"
      >
        <div
          class="modal-header"
          id="modalTitle"
        >

          <slot name="header-modal-slot">
            Podaj nazwę swojej nowej trasy
          </slot>
        </div>
        <section
          class="modal-body"
          id="modalDescription"
        >
          <slot name="body">
            <input
              type="text"
              class=""
              id = "routeNmae"
              placeholder="Podaj nazwę nowej trasy"
              v-model="routeName"
            >
            <input type="file" id="file" ref="myFiles" @change="loadFile">

          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">

            <button style="margin:2px"
              type="button"
              class="btn-primary"
              @click="submitNewRoute()"
              aria-label=""
            >Zatwierdź</button>
              <button style="margin:2px"
                type="button"
                class="btn-danger"
                @click="close"
                aria-label=""
              >Anuluj
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #337ab7;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex !important;
    flex-direction: column!important;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: none !important;
    color: #337ab7;
    justify-content: space-between;
    background: #ffffff;
  }

  .modal-footer {
    border-bottom: 1px solid #eeeeee;
    justify-content: flex-end;
    border-top:none !important;
    background: #ffffff;

  }

  .modal-body {
    border-bottom:none !important;
    position: relative;
    background: #ffffff;
    padding: 20px 10px;
  }


</style>
