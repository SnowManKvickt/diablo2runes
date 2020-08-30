<template>
  <v-container>
    <v-col cols="12" sm="12" md="12">
      <v-data-iterator
        @change="onChange"
        :items="items"
        :items-per-page.sync="itemsPerPage"
        :page="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar dark color="blue darken-3" class>
            <v-text-field v-model="search" clearable flat solo-inverted hide-details label="Search"></v-text-field>
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
              <v-overflow-btn
                :items="dropdown_font"
                flat
                solo-inverted
                label="sort by class"
                hide-details
                class="ml-2 pa-0"
              ></v-overflow-btn>
              <!-- search field for sorting by C'haracter Class' the category to sort from. -->
              <v-spacer></v-spacer>
              <v-btn-toggle v-model="sortDesc" mandatory>
                <v-btn large depressed color="blue" :value="false">
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn large depressed color="blue" :value="true">
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </template>
          </v-toolbar>
        </template>

        <!-- Main card iterations will render here -->
        <template v-slot:default="props">
          <v-row>
            <v-col v-for="item in props.items" :key="item.id" cols="12" sm="6" md="4" lg="3">
              <v-card fill-height shaped>
                <v-card-title class="subheading text-center runeTitle">{{ item.name }}</v-card-title>
                <v-card-subtitle
                  class="subheading font-weight-bold text-center runeCombination py-0"
                >{{item.runeCombination}}</v-card-subtitle>
                <v-card-subtitle
                  class="subheading font-weight-bold text-center py-0"
                >{{ item.type }}</v-card-subtitle>
                <v-card-subtitle
                  class="subheading font-weight-bold text-center py-0"
                >{{ item.lvlreq }}</v-card-subtitle>
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-item-group>
                    <v-list-item
                      class="text-center"
                      v-for="(key, index) in item.stats"
                      :key="index.id"
                    >
                      <v-list-item-subtitle class>{{key}}</v-list-item-subtitle>
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
                <v-btn dark text color="warning" class="ml-2" v-bind="attrs" v-on="on">
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

            <span class="mr-4 grey--text">Page {{ page }} of {{ numberOfPages }}</span>
            <v-btn fab dark color="blue darken-3" class="mr-1" @click="formerPage">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
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
      keys: ["armor", "helms"],
      items: this.myTest(),
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
    myTest: (change) => {
      let defaultSelected =
        change != typeof undefined
          ? runeword.armor
          : this.set(runeword, change, true);
      return defaultSelected;
    },
    onChange(data) {
      this.$set(this, "sortBy", data);
      this.items = this.runeword[data.toString()];
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
v-app {
  background-size: fill;
  background-image: url("https://filecdn015924bits1.ladderstats.com/diablo2/bgs/scosglen.jpg");
}
.runeTitle {
  color: rgb(202, 160, 52);
  /* color: #ad8627; */
}
.v-list-item__subtitle,
.v-list-item__title {
  white-space: pre-wrap;
}
.v-card__title {
  display: block;
}
.v-card__subtitle.runeCombination {
  color: #5f3808;
}
</style>