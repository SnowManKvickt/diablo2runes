<template class="bg">
  <v-container>
    <!-- <v-row align="center" justify="center"> -->
    <v-row align="center" justify="space-between">
      <v-col cols="12" sm="12" md="12" lg="6">
        <v-card
          class="overflow-hidden"
          max-width="auto"
          color="white lighten-1 text--light"
          dark
        >
          <v-toolbar flat color="brown">
            <v-icon>mdi-cube</v-icon>
            <v-toolbar-title class="font-weight-light"
              >Welcome to Diablo LadderStats</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <div class="text--primary">
            <p class="display-1 text--primary">Get started</p>
              <p>
                This Website was created as a tool for new players, and old
                players alike. We hope to ease the process of providing useful game information such as the most commonly used build orders for your current Character. There's a big variety of options to choose from,
                depending on what suits you.
              </p>
              <p class="headline">Crafting</p>
              <p>On the Runewords page, you can look up the blueprints for crafting powerful new gear. Either just look around, or sort by a Character Class or equipment type.</p>
              <p>Runewords are created using armor that has socket slots and make up the very basis of progression in Diablo 2. Some are class specific, early game friendly or more expensive ones that require higher level runes.</p>
              well meaning and kindly.
              <br />"a benevolent smile"
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="deep-purple accent-4">Learn More</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col class="float-right" cols="4" sm="6" md="4">
      <!-- Select rune to show next upgrade -->
        <v-card class="overflow-hidden" color="secondary lighten-1" dark>
          <v-toolbar
            dark
            color="brown"
          >
            <v-icon>mdi-cube-scan</v-icon>
            <v-toolbar-title class="font-weight-light"
              >Diablo 2 Rune Upgrades</v-toolbar-title
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
        <!-- Select rune to show next upgrade -->
        
        <!-- rune upgrade result card -->
        <v-card
          class="mx-auto mt-5"
          color="secondary lighten-1"
          max-width="auto"
          dark
        >
          <v-toolbar flat color="brown">
            <v-icon>mdi-cube</v-icon>
            <v-toolbar-title class="font-weight-light"
              >The Cube result</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-list-item three-line>
            <v-list-item-content v-show="cubeResult.name != null">
              <v-list-item-title v-if="cubeResult" class="headline mb-1">{{
                cubeResult.name
              }}</v-list-item-title>
              <v-list-item-title>
                <h4
                  v-if="cubeResult.count && cubeResult.selectedRune !== 'zod'"
                >
                  {{ cubeResult.count }} {{ cubeResult.selectedRune }}
                  <span v-if="cubeResult.gems">
                    + 1
                    <img
                      aspect-ratio="1"
                      :src="
                        require(`@/assets/images/runes/gems/${cubeResult.gems}.png`)
                      "
                    />
                    <b>{{ cubeResult.gems }}</b>
                  </span>
                  will give you
                  <b>one</b>
                  {{ cubeResult.name }}
                </h4>
                <h4 v-else>Zod is the highest rune!</h4>
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
              v-if="cubeResult && cubeResult.name"
              size="80"
              color
            >
              <img
                :src="require(`@/assets/images/runes/${cubeResult.name}.png`)"
              />
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
        <!-- rune upgrade result card -->
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
