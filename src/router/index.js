import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Runes from '../views/Runes.vue'
// import CharacterBuilds from '../views/CharacterBuilds.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import RuneWords from '../views/RuneWords.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Items',
    component: RuneWords,
  },
  {
    path: '/runes',
    name: 'runes',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  /* {
    path: '/characterbuilds',
    name: 'Characterbuilds',
    component: CharacterBuilds,
  }, */
  /* Will match all not found (404) */
  {
    path: "*",
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  testing: true, // can't remember if this property exists but.. meh.
  routes
})

export default router
