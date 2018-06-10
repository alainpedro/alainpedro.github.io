import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Logged from '@/components/Logged'
import TripRoute from '@/components/TripRoute'
import TripRouteAdd from '@/components/TripRouteAdd'
import Photo from '@/components/Photo'
import PhotoAdd from '@/components/PhotoAdd'
import Video from '@/components/Video'
import VideoAdd from '@/components/VideoAdd'
import Poster from '@/components/Poster'
import Presentation from '@/components/Presentation'
import MapView from '@/components/MapView'
import Register from '@/components/Register'
import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.use(Router);

const myRouter = new Router({

  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: { auth: true }
    },
    {
      path:'/login',
      name:'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path:'/logged',
      name:'Logged',
      component: Logged
    },
    {
      path:'/tripRoute',
      name:'TripRoute',
      component: TripRoute
    },
    {
      path:'/tripRoute/add',
      name:'TripRouteAdd',
      component: TripRouteAdd
    },
    {
      path:'/photo',
      name:'Photo',
      component: Photo
    },
    {
      path:'/photo/add',
      name:'PhotoAdd',
      component: PhotoAdd
    },
    {
      path:'/video',
      name:'Video',
      component: Video
    },
    {
      path:'/video/add',
      name:'VideoAdd',
      component: VideoAdd
    },
    {
      path:'/poster',
      name:'Poster',
      component: Poster
    },
    {
      path:'/presentation',
      name:'Presentation',
      component: Presentation
    },
    {
      path:'/mapView',
      name:'MapView',
      component: MapView
    }




  ]

});
myRouter.beforeEach((to, from, next) => {
  var jwt = localStorage.getItem('id_token');
  if(!jwt && to.path =="/register"){
    next();
    return
  }
  if(!jwt && to.path != "/login") {
    next("/login");
  } else {
    next();
  }
});

export default myRouter;
