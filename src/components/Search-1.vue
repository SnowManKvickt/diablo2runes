<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="5" sm="10" md="5">
        <v-card class="overflow-hidden" color="secondary lighten-1" dark>
          <v-toolbar flat color="brown">
            <v-icon>mdi-cube-scan</v-icon>
            <v-toolbar-title class="font-weight-light">Diablo 2 Cube Receipes</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-autocomplete
              :items="states"
              :filter="customFilter"
              color="white"
              item-text="name"
              label="State"
              append-item
              return-object
              :clearable="true"
              @change="onChange"
            ></v-autocomplete>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="!model" color="grey darken-3" @click="model = null">
              Clear
              <v-icon right>mdi-close-circle</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="5" sm="5" md="2">
        <v-card class="overflow-hidden mx-auto" color="secondary lighten-1" max-width="auto" dark>
          <v-toolbar flat color="brown">
            <v-icon>mdi-cube</v-icon>
            <v-toolbar-title class="font-weight-light">The result</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">OVERLINE</div>
              <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
              <v-list-item-subtitle>{{model}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn text>Button</v-btn>
            <v-btn text>Button</v-btn>
          </v-card-actions>
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
      hasSaved: false,
      isEditing: true,
      model: null,
      states: runes.runes,
      nextRune: null,
    };
  },

  methods: {
    customFilter(item, queryText, itemText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.next.toLowerCase();
      // What the user typed in
      const searchText = queryText.toLowerCase();
      console.log("customFilter rune:", textOne);
      console.log("customFilter next rune after:", textTwo);
      console.log("customFilter searchText:", searchText);
      let result = textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      return result;
    },
    save() {
      this.isEditing = !this.isEditing;
      this.hasSaved = true;
    },
    onChange() {
      console.log("changed")
    }
  },
};
</script>