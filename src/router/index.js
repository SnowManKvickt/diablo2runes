import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CharacterBuilds from '../views/CharacterBuilds.vue'
import About from '../views/About.vue'
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
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/characterbuilds',
    name: 'Characterbuilds',
    component: CharacterBuilds,
  },
]

const router = new VueRouter({
  testing: true, // not  sure if this property is valid ZULUL.
  routes
})

export default router
