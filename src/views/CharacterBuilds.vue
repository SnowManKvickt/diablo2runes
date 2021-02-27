<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="6">
        <v-card class="overflow-hidden" color="secondary lighten-1" dark>
          <v-toolbar flat color="brown">
            <v-icon>mdi-cube-scan</v-icon>
            <v-toolbar-title class="font-weight-light">Diablo 2 Character Build Orders</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-autocomplete
              :items="states"
              :filter="customFilter"
              color="white"
              item-text="name"
              label="Search for a build"
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
      <v-col cols="12" sm="4" md="4">
        <v-card class="overflow-hidden mx-auto" color="secondary lighten-1" max-width="auto" dark>
          <v-toolbar flat color="brown">
            <v-icon>mdi-cube</v-icon>
            <v-toolbar-title class="font-weight-light">Builds</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <!-- Search result -->
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title
                class="mb-1"
                v-if="!characterBuild.characterActive"
              >Search for a playable class to show available build orders.</v-list-item-title>
              <v-col cols="12" sm="6" md="12" lg="12" v-if="characterBuild.characterActive">
                <v-chip-group light column active-class="primary--text">
                  <v-chip
                    v-on:click="showBuild(tag, i)"
                    v-for="(tag, i) in characterBuild.buildsAvailable"
                    :key="i"
                  >{{ tag.type + " By: " + tag.by }}</v-chip>
                </v-chip-group>
              </v-col>
            </v-list-item-content>
            <v-list-item-avatar v-if="characterBuild.characterActive" size color>
              <img
                :src="require(`@/assets/images/characters/${characterBuild.characterSelected}.gif`)"
              />
            </v-list-item-avatar>
          </v-list-item>
          <!-- Search result -->
        </v-card>
      </v-col>
      <v-col cols="12" sm="11" md="11">
        <v-timeline :dense="true" :fill-dot="true" v-if="characterBuild.buildActive">
          <v-timeline-item color="purple lighten-2" right v-for="item of characterBuild.buildSelected.description" :key="item.name">
            <v-card>
              <v-card-title class="brown lighten-2">
                <v-icon dark size="42" class="mr-4">mdi-magnify</v-icon>
                <h2 class="display-1 white--text font-weight-light">{{item.name}}</h2>
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    md="10"
                    v-html="item.message"
                  >xd</v-col>
                  <v-col class="hidden-sm-and-down text-right" md="2">
                    <v-icon size="64">mdi-calendar-text</v-icon>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import * as chars from "@/assets/CharacterBuilds.js";
export default {
  data() {
    return {
      characterBuild: {
        characterSelected: null,
        // True if selected from search/dropdown.
        characterActive: false,
        // Is populated by 'chars' module build orders after the user selects a state from 'states'.
        buildsAvailable: [],
        buildSelected: null,
        buildActive: false,
      },
      reverse: true,
      chars,
      states: [
        "Amazon",
        "Assassin",
        "Necromancer",
        "Barbarian",
        "Paladin",
        "Sorceress",
        "Druid",
      ],
      dense: false,
      hasSaved: false,
      isEditing: true,
      model: null,
    };
  },
  computed: {
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.model[key] || "n/a",
        };
      });
    },
  },
  methods: {
    customFilter(item, queryText, itemText) {
      const textOne = item.toLowerCase();
      // What the user typed in
      const searchText = queryText.toLowerCase();
      let result = textOne.indexOf(searchText) > -1;
      return result;
    },
    onChange(data) {
      let y = Object.keys(chars.characterBuilds);
      for (let characterName in chars.characterBuilds) {
        let currentCharacter = chars.characterBuilds[characterName];
        if (characterName == data.toLowerCase()) {
          this.$set(
            this.characterBuild,
            "buildsAvailable",
            chars.characterBuilds[characterName]
          );
          break;
        }
      }
      // Required when the user resets/deletes current search and the search has no object props such as activeRune.next (next rune).
      if (data !== undefined) {
        this.characterBuild = Object.assign({}, this.characterBuild, {
          characterActive:
            this.characterBuild.characterActive != null ? true : false,
          characterSelected: data.toLowerCase(),
        });
      }
    },
    showBuild(tag ,i) {
      console.log("showBuild clicked tag:", tag);
      console.log("showBuild clicked i:", i);
      console.log("this.characterBuild: ", this.characterBuild);
      this.$set(this.characterBuild, "buildActive", true);
      this.$set(this.characterBuild, "buildSelected", tag);
      // this.characterBuild = Object.assign({}, this.characterBuild.buildSelected, this.characterBuild.buildSelected != this.characterBuild.buildSelected)
    },
  },
};
</script>