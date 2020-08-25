import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CharacterBuilds from '../views/CharacterBuilds.vue'
import RuneWords from '../views/RuneWords.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/runewords',
    name: 'Runewords',
    component: RuneWords,
  },
  {
    path: '/characterbuilds',
    name: 'Characterbuilds',
    component: CharacterBuilds,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  testing: true, // not  sure if this property is valid ZULUL.
  routes
})

export default router
