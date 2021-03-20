<template>
  <v-container>
    <v-col cols="12" sm="12" md="12">
      <v-data-iterator
        @change="onChange"
        :items="items"
        :items-per-page.sync="itemsPerPage"
        :page="page"
        :search="search"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar dark color="brown darken-1 mt-0 mb-3" class>
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              label="Search"
            ></v-text-field>
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer></v-spacer>
              <!-- search field for selecing the category to sort from. -->
              <v-select
                v-model="sortBy"
                @change="onChange"
                flat
                solo-inverted
                hide-details
                :items="keys"
                label="Sort by"
              ></v-select>
              <!-- search field for sorting by 'Character Class' the category to sort from. -->
              <v-select
                class="ml-2 pa-0"
                :items="characterClasses"
                @change="sortByClass"
                flat
                solo-inverted
                hide-details
                label="Sort by class"
              ></v-select>
            </template>
          </v-toolbar>
        </template>

        <!-- Main card iterations will render here -->
        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="(item, index) in props.items"
              class=""
              :key="index"
              cols="12"
              sm="6"
              md="5"
              lg="3"
            >
              <v-card class="rune item-bg" fill-height shaped>
                <div class="item-header">
                  <v-card-title class="headline text-center runeTitle">{{
                    item.name
                  }}</v-card-title>
                  <v-card-subtitle
                    class="subheading font-weight-bold text-center runeCombination py-0"
                    >{{ item.runeCombination }}</v-card-subtitle
                  >
                  <v-card-subtitle
                    class="subheading font-weight-bold text-center gearType py-0"
                    >{{ item.type }}</v-card-subtitle
                  >
                  <v-card-subtitle
                    class="subheading font-weight-bold text-center levelRequirement py-0"
                    >{{ item.lvlreq }}</v-card-subtitle
                  >
                </div>
                <!-- <v-divider></v-divider> -->
                <v-list dense dark>
                  <v-list-item-group>
                    <v-list-item
                      class="text-center dark-item"
                      v-for="(key, index) in item.stats"
                      :key="index.id"
                    >
                      <v-list-item-subtitle class="text-light subtitle-1">{{
                        key
                      }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>
        <!-- Main card iterations will render here -->

        <!-- items per page -->
        <template v-slot:footer>
          <v-row class="mt-2" align="center" justify="center">
            <span class="warning--text">Items per page</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  text
                  color="warning"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ itemsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-spacer></v-spacer>

            <span class="mr-4 grey--text"
              >Page {{ page }} of {{ numberOfPages }}</span
            >
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="mr-1"
              @click="formerPage"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="ml-1"
              @click="nextPage"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </template>
        <!-- items per page -->
      </v-data-iterator>
    </v-col>
  </v-container>
</template>
<script>
import * as runeword from "@/assets/runewords.js";
export default {
  name: "Runewords",
  data() {
    return {
      runeword,
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "armor",
      keys: ["armor", "helms", "shields", "weapons"],
      characterClasses: [
        "amazon",
        "assassin",
        "necromancer",
        "barbarian",
        "paladin",
        "sorceress",
        "druid",
      ],
      items: this.defaultCategory(),
    };
  },
  computed: {
    numberOfPages(d) {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== `name`);
    },
  },
  methods: {
    defaultCategory: (change) => {
      let defaultSelected =
        change != typeof undefined
          ? runeword.armor
          : this.set(runeword, change, true);
      return defaultSelected;
    },
    onChange(data) {
      console.log("onChange: ", data);
      console.log("onChange runewords: ", this.runeword);
      this.$set(this, "sortBy", data);
      this.items = this.runeword[data.toString()];
    },
    /* sortByClass(data) {
      let filtered = this.items.filter((car => car.class === data));
      this.items = filtered;
      console.log("sortByClass: ", data);
      console.log("sortByClass this.items: ", this.items);
      console.log("sortByClass filtered: ", filtered);
    }, */
    sortByClass(data) {
      this.search = data;
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
  },
};
</script>
<style scoped>
.item-bg {
  background-image: url("../../public/static/images/frame.png");
  background-size: contain;
  background-repeat: round;
}

.rune {
  background-color: hsl(0deg 0% 100% / 0%);
  color: rgba(0, 0, 0, 0.87);
}

/* .theme--light.v-list {
  background: #ffffff8f;
  color: rgba(0, 0, 0, 0.87);
} */

.dark-item {
  background-image: url("../../public/static/images/btn-secondary-sheet-sm.jpg");
  background-repeat: space;
  background-size: cover;
  padding: 0.4em;
}
.v-list,
.v-list-item__subtitle,
.v-list-item__title {
  white-space: pre-wrap;
}
.v-card__title {
  display: block;
}

.runeTitle {
  color: rgb(255 184 0);
  /* color: rgb(202, 160, 52); */
  /* color: #ad8627; */
}

.theme--light.v-card .v-card__subtitle,
.theme--light.v-card > .v-card__text .runeCombination {
  color: #fff;
}
.gearType {
  color: #fff;
}
.levelRequirement {
  color: #fff;
}
</style>
