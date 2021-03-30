<template>
  <v-app id="inspire">
    <v-navigation-drawer app dark v-model="drawer">
      <NavigationDrawer></NavigationDrawer>
    </v-navigation-drawer>
    <v-app-bar app dark>
      <v-img
        alt="Diablo.ladderstats.com logo"
        class="shrink mr-2"
        contain
        :src="require(`@/assets/images/characters/logo.png`)"
        transition="scale-transition"
        width="64"
      />
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <strong>Diablo.ladderstats.com</strong>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view> </router-view>
      </v-container>
    </v-main>
    <v-footer padless dark>
      <v-col class="text-center" cols="12">
        <p class="subtitle-1 mb-auto">
          &copy; Diablo.LadderStats.com - {{ new Date().getFullYear() }} - This
          is a fan made website and is not associated or maintained by &copy;
          Blizzard Entertainment.
        </p>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import NavigationDrawer from "./components/NavigationDrawer";

export default {
  name: "App",
  components: {
    NavigationDrawer,
  },
  data: () => ({
    drawer: null,
  }),
};
</script>
<style scoped>
.theme--light.v-application {
  color: white;
  background-size: cover;
  background-image: url("../public/static/images/backgrounds/classes-bg-sorceress-max.jpg");
}
</style>
