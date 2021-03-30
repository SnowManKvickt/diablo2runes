<template class="bg">
  <v-container>
    <!-- <v-row align="center" justify="center"> -->
    <v-row align="start">
      <v-col cols="12" sm="12" md="12" lg="5">
        <v-card
          class="overflow-hidden"
          max-width="auto"
          color="white lighten-1 text--light"
          dark
        >
          <v-toolbar flat color="brown">
            <!-- <v-icon>mdi-cube</v-icon> -->
            <v-toolbar-title class="display-1 font-weight-light"
              >About this site</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <div class="text--primary">
              <div class="body-1">
                <p>
                  With the exciting announcement of
                  <a target="_blank" href="https://diablo2.blizzard.com/"
                    >Diablo 2 Resurrected</a
                  >
                  I created this website as a quick tool for both, veteran and
                  new players alike to get up to speed on the Crafting and
                  itemization aspects that exist in Diablo 2.
                </p>
                <p>
                  Since Blizzard announced they will also update the original
                  <a
                    target="_blank"
                    href="http://classic.battle.net/diablo2exp/"
                    >Arreat Summit </a
                  >website,
                  <span class="subtitle-2">unfortunately (or not)</span> I
                  skipped adding further game information.
                </p>
                <p>Regardless i hope some of you find this website useful!</p>
                <p>If you wish to contact me about errors on the site or any other matter: <a target="_blank" href="mailto: carl@ladderstats.com">	carl@ladderstats.com</a></p>
              </div>
            </div>
            <div class="text-center">
              <v-btn x-large color="brown" dark @click="sheet = !sheet">
                show all runes
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" md="12" lg="7">
        <!-- Select rune to show next upgrade -->
        <v-card class="overflow-hidden" color="secondary lighten-1" dark>
          <v-toolbar dark color="brown">
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
      <v-col>
      <div class="center">
        <v-dialog v-model="sheet" width="auto" scrollable fullscreen>
          <v-card>
            <v-card-title class="headline white--text brown">
              All Runes
            </v-card-title>

            <v-card-text>
              <v-simple-table class="table-responsive">
                <thead>
                  <tr>
                    <th class="text-left">
                      Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in states" :key="item.name">
                    <td>
                      <img width="auto"
                        :src="require(`@/assets/images/runes/${item.name}.png`)"
                        
                      >
                      {{ item.name }}
                    </td>
                    <!-- <td>{{ item.next }}</td> -->
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="sheet = !sheet">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as runes from "@/assets/runes.js";
export default {
  name: "Runes",
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
      sheet: false,
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
