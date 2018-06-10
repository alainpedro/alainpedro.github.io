<template>
  <div class="driverAdd col-sm-6 col-sm-offset-3">
    <div class="panel panel-default">
      <div class="panel-heading">Add driver</div>
      <div class="panel-body">
        <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '../auth'
  import router from '../router/index.js';
  import VueFormGenerator from "vue-form-generator";
  import "vue-form-generator/dist/vfg.css";

  export default {
    name: 'TripRouteAdd',
    components: {
      "vue-form-generator": VueFormGenerator.component
    },
    data() {
      return {
        model: {
          id: "1",
          name: "trip name",
          file: ""
        },
        schema: {
          fields: [{
            type: "input",
            inputType: "text",
            label: "ID",
            model: "id",
            readonly: true,
            featured: false,
            disabled: true
          }, {
            type: "input",
            inputType: "text",
            label: "Name",
            model: "name",
            required: true,
            disabled: false,
            min: 5,
            max: 40,
            placeholder: "User's name",
            validator: VueFormGenerator.validators.string
          }, {
            type: "upload",
            label: "File",
            inputName: "file",
            required: true
          }, {
            type: "submit",
            buttonText: "Submit",
            onSubmit: this.submitForm,
            disabled() {
              return this.errors.length > 0;
            }
          }
          ]
        },

        formOptions: {
          validateAfterLoad: true,
          validateAfterChanged: true,
          validateBeforeSubmit: true
        }
      };
    },

    methods: {
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
        this.$http.put('https://morning-escarpment-49088.herokuapp.com/driver/create', JSON.stringify(this.model), {
          headers: auth.getAuthHeader(),
          type: 'PUT',
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',

        }).then(function () {
        }), function (data) {
          console.log(data);
        };
        router.push("/Home");
      }
    }

  }
</script>
