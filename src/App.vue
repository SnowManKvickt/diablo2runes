<template>
  <v-app>
    <v-app-bar app color="secondary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://crackanutshell.com/wp-content/uploads/sneakdelivs/diablo-cube.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
        <Search />
    </v-main>
    <v-footer padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>Diablo.LadderStats.com</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Search from "./components/Search";

export default {
  name: "App",

  components: {
    Search,
  },

  data: () => ({
    //
  }),
};
</script>
<style scoped>
.theme--light.v-application {
  background-image: url("../public/static/images/bg1.jpg");
}
</style>