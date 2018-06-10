import router from '../router/index.js';
const API_URL = 'http://routeapi.azurewebsites.net';
const LOGIN_URL = API_URL + '/authentication-token';
const SIGNUP_URL = API_URL + '/users/';

export default {

  user: {
    authenticated: false
  },

  login(context, creds) {

    let self = this;

   context.$http.post(LOGIN_URL, JSON.stringify({username: creds['username'], password: creds['password']})
    , {
      headers: {
        "content-type": "application/json",
      }
    }).then(function (data) {
      localStorage.setItem('id_token', data.bodyText);
      self.user.authenticated = true;
      router.push('/Home');
    }, function (err) {
      context.error = "Złe dane"
    })
  },


  logout() {
    localStorage.removeItem('id_token');
    this.user.authenticated = false;
    router.push('/login');
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token');
    if (jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false
    }
  },
  getAPI_URL(){
    return this.API_URL;
  },


  getAuthHeader() {
    return {
      'authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}
