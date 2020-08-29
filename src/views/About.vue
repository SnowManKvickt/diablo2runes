<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="7">
        <v-card class="elevation-12">
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title>About us</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text class="black--text text-primary text-body-1">
            This website was made to provide an "all in one" sort of knowledgebase for Diablo 2 content. For now it includes rune upgrades (shows crafting result and required gems).
            Forgot how to make a certain armor runeword? No problem, either search by name and category or simply scroll through the pages.
          </v-card-text>
          <v-card-text>
            This website will continually be updated with more content and features.
          </v-card-text>
          <v-card-title>Progress</v-card-title>
          <v-list-item>
              <v-list-item-action>
                <v-checkbox input-value="" color="primary"></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Character class builds</v-list-item-title>
                <v-list-item-subtitle>coming soon.</v-list-item-subtitle>
              </v-list-item-content>
          </v-list-item>
          <v-list-item>
              <v-list-item-action>
                <v-checkbox input-value="" color="primary"></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Common blueprints</v-list-item-title>
                <v-list-item-subtitle>coming soon.</v-list-item-subtitle>
              </v-list-item-content>
          </v-list-item>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
