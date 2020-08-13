<template>
  <div>
    <v-card class="overflow-hidden" color="secondary lighten-1" dark>
      <v-toolbar flat color="brown">
        <v-icon>mdi-account</v-icon>
        <v-toolbar-title class="font-weight-light">Diablo 2 Cube Receipes</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-3" fab small @click="isEditing = !isEditing">
          <v-icon v-if="isEditing">mdi-close</v-icon>
          <v-icon v-else>mdi-pencil</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-autocomplete
          :items="states"
          :filter="customFilter"
          color="white"
          item-text="name"
          label="State"
        ></v-autocomplete>
      </v-card-text>
    </v-card>
    <v-card class="overflow-hidden" color="secondary lighten-1" dark>
      </v-card>
  </div>
</template>

<script>
import runes from "@/assets/runes.js";
export default {
  data() {
    return {
      hasSaved: false,
      isEditing: true,
      model: null,
      states: [],
    };
  },

  methods: {
    customFilter(item, queryText, itemText) {
      console.log("Runes: ", runes);
      console.log("customFilter item:", item);
      console.log("customFilter queryText:", queryText);
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    save() {
      this.isEditing = !this.isEditing;
      this.hasSaved = true;
    },
  },
};
</script>