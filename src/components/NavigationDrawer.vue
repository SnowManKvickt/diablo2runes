<template>
  <v-list>
    <v-list-item v-for="item in items" :key="item.title" :to="item.link">
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Items", icon: "mdi-view-dashboard", link: "/" },
        { title: "Runes", icon: "mdi-image", link: "/runes" },
        { title: "About", icon: "mdi-help-box", link: "/about" },
        /* { title: "Runes", icon: "mdi-view-dashboard", link: "/runes" },
        {
          title: "Character Builds",
          icon: "mdi-image",
          link: "/characterbuilds",
        }, */
      ],
      color: "primary",
      colors: ["primary", "blue", "success", "red", "teal"],
      right: false,
      permanent: true,
      miniVariant: false,
      expandOnHover: false,
      background: true,
    };
  },
};
</script>
