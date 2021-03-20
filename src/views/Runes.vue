<template class="bg">
  <v-container>
    <v-row align="center" justify="space-between">
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-card>
          <v-toolbar flat color="brown" dark>
            <v-toolbar-title>Runes</v-toolbar-title>
          </v-toolbar>
          <v-tabs>
            <v-tab>
              <v-icon left>
                mdi-account
              </v-icon>
              Runes
            </v-tab>
            <v-tab>
              <v-icon left>
                mdi-lock
              </v-icon>
              Gems
            </v-tab>
            <v-tab>
              <v-icon left>
                mdi-access-point
              </v-icon>
              Option 3
            </v-tab>

            <!-- tab start -->

            <v-tab-item class="mt-2">
              <v-row align="center" justify="space-between">
                <!-- start runes information -->
                <v-col lg="6">
                  <v-card
                    class="overflow-hidden"
                    max-width="auto"
                    color="white lighten-1 text--light"
                    dark
                  >
                    <v-toolbar flat color="brown">
                      <!-- <v-icon>mdi-cube</v-icon> -->
                      <v-toolbar-title class="display-1 font-weight-light"
                        >Runes & Gems</v-toolbar-title
                      >
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                      <div class="text--primary">
                        <p class="display-1 text--primary">What are runes?</p>
                        <p>
                          Runes are small objects that, like gems and jewels,
                          have no function until they are socketed into an item.
                        </p>
                        <p class="headline">How to use runes</p>
                        <p>
                          Runes add different properties to shields or armor vs.
                          weapons, and sometimes shields and armor differ as
                          well. See the full runes listing here. Runes can be
                          upgraded; 2 or 3 of one type, plus a particular gem
                          type/quality, can be combined in the Horadric Cube to
                          upgrade to the next higher level rune. Runes are most
                          powerful when combined into special runewords, so be
                          sure you check the recipes for those.
                        </p>
                        <p>
                          Runewords are created using armor that has socket
                          slots and make up the very basis of progression in
                          Diablo 2. Some are class specific, early game friendly
                          or more expensive ones that require higher level
                          runes.
                        </p>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <!-- End runes information -->

                <v-col lg="6">
                  <v-card
                    class="overflow-hidden"
                    color="secondary lighten-1"
                    dark
                  >
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
                  <!-- End Select rune to show next upgrade -->

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
                        <v-list-item-title
                          v-if="cubeResult"
                          class="headline mb-1"
                          >{{ cubeResult.name }}</v-list-item-title
                        >
                        <v-list-item-title>
                          <h4
                            v-if="
                              cubeResult.count &&
                                cubeResult.selectedRune !== 'zod'
                            "
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
                          :src="
                            require(`@/assets/images/runes/${cubeResult.name}.png`)
                          "
                        />
                      </v-list-item-avatar>
                    </v-list-item>
                  </v-card>
                </v-col>
              </v-row>
            </v-tab-item>
            <!-- tab end -->

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <p>
                    option 2
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <p>
                    option 3
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <p>
                    option
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
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
