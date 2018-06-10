<template>
  <div class = "login">
   <div class="login col-sm-4 col-sm-offset-4">
     <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
   </div>
 </div>
 </template>

 <script>
   import VueFormGenerator from "vue-form-generator";
   import "vue-form-generator/dist/vfg.css";
   import router from '../router/index.js';

   export default {
   name: 'Register',
   components: {
     "vue-form-generator": VueFormGenerator.component
   },
   data() {
     return {
       model: {
         username: "",
         password: "",
         email: "",
       },
       schema: {
         fields: [
           {
             type: "input",
             inputType: "text",
             label: "username",
             model: "username",
             readonly: false,
             featured: true,
             required: true,
             disabled: false,
             min: 5,
             max: 40,
             placeholder: "nazwa użytkownika",
             validator: VueFormGenerator.validators.string
           },
           {
             type: "input",
             inputType: "password",
             label: "hasło",
             model: "password",
             readonly: false,
             featured: true,
             required: true,
             disabled: false,
             min: 5,
             max: 40,
             placeholder: "hasło",
             validator: VueFormGenerator.validators.string
           },
           {
             type: "input",
             inputType: "text",
             label: "E-mail",
             model: "email",
             readonly: false,
             featured: true,
             required: true,
             disabled: false,
             min: 5,
             max: 40,
             placeholder: "e-mail",
             validator: VueFormGenerator.validators.email
           },
           {
             type: "submit",
             buttonText: "Rejestracja",
             onSubmit: this.submitForm,
             disabled() {
               return this.errors.length > 0;
             },
           },
           {
             type: "submit",
             buttonText: "Anuluj",
             onSubmit: this.back,
             disabled() {
               return this.errors.length > 0;
             }
           }
         ]

       },
       formOptions: {
         validateAfterLoad: false,
         validateAfterChanged: true,
         validateBeforeSubmit: true,
       }
     }},

       methods: {
       submitForm: function () {


         this.$http.post('http://routeapi.azurewebsites.net/user',JSON.stringify(this.model), {
           contentType: 'application/json; charset=utf-8',
           dataType: 'json',
         }).then(function () {
         }), function (data) {

         };
         router.push("/login");
       },
         back: function () {
           router.push("/login");
         }

     }

 }

 </script>
