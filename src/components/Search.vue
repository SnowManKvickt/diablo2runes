<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="5" sm="10" md="5">
        <v-card class="overflow-hidden" color="secondary lighten-1" dark>
          <v-toolbar flat color="brown">
            <v-icon>mdi-cube-scan</v-icon>
            <v-toolbar-title class="font-weight-light"
              >Diablo 2 Cube Receipes</v-toolbar-title
            >
          </v-toolbar>
          <v-card-text>
            <v-autocomplete
              :items="states"
              :filter="customFilter"
              color="white"
              item-text="name"
              label="Search recipe"
              append-item
              return-object
              :clearable="true"
              outlined
              chips
              small-chips
              dense
              @change="onChange"
            ></v-autocomplete>
          </v-card-text>
          <v-divider></v-divider>
          <v-expand-transition></v-expand-transition>
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="5" sm="5" md="2">
        <v-card
          class="overflow-hidden mx-auto"
          color="secondary lighten-1"
          max-width="auto"
          dark
        >
          <v-toolbar flat color="brown">
            <v-icon>mdi-cube</v-icon>
            <v-toolbar-title class="font-weight-light"
              >The result</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-list-item three-line>
            <v-list-item-content v-show="cubeResult.name != null">
              <v-list-item-title v-if="cubeResult" class="headline mb-1">{{
                cubeResult.name
              }}</v-list-item-title>
              <v-list-item-subtitle>
                <p v-if="cubeResult.count">
                  {{ cubeResult.count }} {{ cubeResult.selectedRune }}
                  <span v-if="cubeResult.gems"
                    >+ 1
                    <img
                      aspect-ratio="1"
                      :src="
                        require(`@/assets/images/runes/gems/${cubeResult.gems}.png`)
                      "
                    />
                    {{ cubeResult.gems }}</span
                  >
                  will give you <b>one</b> {{ cubeResult.name }}
                </p>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
              v-if="cubeResult && cubeResult.name"
              size="64"
              color="grey"
            >
              <img
                :src="require(`@/assets/images/runes/${cubeResult.name}.png`)"
              />
            </v-list-item-avatar>
          </v-list-item>
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
