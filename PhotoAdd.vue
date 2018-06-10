<template>
  <div class="photoAdd col-sm-8 col-sm-offset-2">
    <div class="panel panel-default" style="margin-top:10px;">
      <div class="panel-heading">Add photo</div>
      <div class="panel-body">
        <div class="vue-form-generator">
          <fieldset>
            <div class="form-group valid field-mapinput"><label for="choose-the-point">Choose the point</label>
              <div class="field-wrap">

                <gmap-map
                  :center="center"
                  :zoom="12"
                  style="width:100%;  height: calc(100vh - 460px)"
                >
                  <GmapPolyline v-if="path" :path="path"/>
                  <gmap-marker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="markers[index].position"
                    :label="markers[index].label"
                    :clickable="true"
                    @click="clicker(index, markers)"
                  ></gmap-marker>
                </gmap-map>

              </div>
            </div>
            <div class="form-group valid required field-upload"><label for="file">Image file</label>
              <div class="field-wrap">
                <div class="wrapper">

                  <input id="file" type="file" name="file" @change="loadFile" required="required" class="form-control">
                </div>
              </div>
            </div>
            <div class="form-group valid field-submit">
              <div class="field-wrap" style="display:block">
                <input id="subinput" type="submit" value="Submit" @click="submitForm()">
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '../auth'
  import VueFormGenerator from "vue-form-generator";
  import "vue-form-generator/dist/vfg.css";
  import * as axios from 'axios';


  export default {
    name: 'photoAdd',
    components: {
      "vue-form-generator": VueFormGenerator.component
    },
    data() {
      return {
        center: {lat: 52.2296756, lng: 21.012228700000037},
        markers: [        ],
        path: [        ],
        places: [],
        currentPlace: null,
        pointId: "",
        file: "",
      };
    },
    mounted() {
      this.getData();

    },
    methods: {
      loadFile: function(){
        this.file = document.getElementById('file').files[0];
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
                label: (point.pointId+1).toString(),
              }
            )
          });
          this.markers = tab;
          if (this.markers.length > 1) {
            this.center = {lat: this.markers[0].position.lat, lng: this.markers[0].position.lng};
          }
          this.makePaths();
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

      prettyJSON: function (json) {
        if (json) {
          json = JSON.stringify(json, undefined, 4);
          json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
          return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
              if (/:$/.test(match)) {
                cls = 'key';
              } else {
                cls = 'string';
              }
            } else if (/true|false/.test(match)) {
              cls = 'boolean';
            } else if (/null/.test(match)) {
              cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
          });
        }
      },
      submitForm: function () {
        if (this.pointId === "") {
          alert('You must choose a point!');
          return;
        }
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
          alert('The File APIs are not fully supported in this browser.');
          return;
        }

        var input = document.getElementById("file");
        if (!input) {
          alert("Um, couldn't find the fileinput element.");
        }
        else if (!input.files) {
          alert("This browser doesn't seem to support the `files` property of file inputs.");
        }
        else if (!input.files[0]) {
          alert("Please select a file before clicking 'Load'");
        }
        else {
          var data = new FormData();
          data.append('file', this.file, this.file.name);
          data.append('pointId', this.pointId);
          var promise = axios.post('http://routeapi.azurewebsites.net/route/'+this.$parent.$data.actualtripId +'/photo', data, {
            headers: auth.getAuthHeader()
          }).then(function (data) {
            window.location.reload(true);

          });
        }

      },
      clicker(index, markers) {
        var i;
        for (i = 0; i < markers.length; i++) { //odkolorowujemy poprzedni X
          console.log(markers[i].label);
          if (markers[i].label.tmp != undefined) {
            markers[i].label = {text: markers[i].label.tmp, color: 'black'};
          }
        }

        //kolorujemy kliknięty punkt
        if(markers[index].label.text != undefined) {
          var tmp = markers[index].label.text;
        } else {
          var tmp = markers[index].label;
        }
        markers[index].label = {text: 'X', tmp: tmp, color: 'white'};
        this.pointId = index;//dodajemy punkt do danych
      }
    },




  }
</script>
