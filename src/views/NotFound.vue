<template class="bg">
  <v-container>
    <!-- <v-row align="center" justify="center"> -->
    <v-row align="top" justify="top">
      <v-col cols="1" sm="6" md="6" lg="6">
        <v-card
          class="overflow-hidden"
          max-width="auto"
          color="white lighten-1 text--light"
          dark
        >
          <v-toolbar flat color="brown">
            <!-- <v-icon>mdi-cube</v-icon> -->
            <v-toolbar-title class="display-1 font-weight-light"
              >Page Not Found</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <div class="text--primary">
              <p class="display-1 text--primary">
                ...I thank you, friend, for coming to my aid.
              </p>
              <p>
                The page you were looking for could not be found, but do not
                despair, navigate further by using the right side menu to
                explore!
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="1" sm="6" md="6" lg="6">
        <v-card
          class="overflow-hidden"
          max-width="auto"
          color="transparent lighten-1 text--light"
          dark
        >
        <v-img
              aspect-ratio="1"
              contain
              class="img-fluid"
              height="auto"
                :src="require(`@/assets/images/characters/decard-cain.png`)"
              >
              </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as runes from "@/assets/runes.js";
export default {
  data() {
    return {
      runes,
      states: runes.runes,
      cubeResult: {
        name: null,
        selectedRune: null,
        count: null,
        gems: null,
      },
      hasSaved: false,
      isEditing: true,
      model: null,
    };
  },

  methods: {
    customFilter(item, queryText, itemText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.next.toLowerCase();
      // What the user typed in
      const searchText = queryText.toLowerCase();
      let result =
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1;
      return result;
    },
    onChange(activeRune) {
      console.log("onChange one:", activeRune);
      // Required when the user resets/deletes current search and the search has no object props such as activeRune.next (next rune).
      if (activeRune !== undefined) {
        this.$set(
          this,
          "cubeResult",
          Object.assign({
            name: activeRune.next,
            selectedRune: activeRune.name,
            gems:
              activeRune.gems.required === true
                ? activeRune.gems.name.toLowerCase()
                : false,
            count: activeRune.count,
          })
        );
      }
    },
  },
};
</script>
<style scoped>
.decardCain {
  background-size: auto;
}
</style>
