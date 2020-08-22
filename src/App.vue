<template>
  <v-app id="inspire">
    <v-navigation-drawer app dark v-model="drawer">
      <NavigationDrawer></NavigationDrawer>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="brown"
      dark
    >
      <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require(`../public/static/images/diablo.gif`)"
          transition="scale-transition"
          width="64"
        />
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <strong> Diablo.LadderStats.com</strong>
        </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
      <!-- <Search /> -->
    <router-view> </router-view>
    </v-container>
    </v-main>
    <!-- <v-footer padless dark>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>Diablo.LadderStats.com</strong>
      </v-col>
    </v-footer> -->
  </v-app>
</template>

<script>
import NavigationDrawer from "./components/NavigationDrawer";
import Search from "./components/Search";

export default {
  name: "App",

  components: {
    Search,
    NavigationDrawer,
  },

  data: () => ({
    drawer: null,
  }),
};
</script>
<style scoped>
.theme--light.v-application {
  background-image: url("../public/static/images/bg3.jpg");
}
</style>