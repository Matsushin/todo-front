<template>
  <v-app>
    <header>
      <v-app-bar
        color="primary"
        app
        dark>
        <v-app-bar-nav-icon @click="drawer = true" />
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        fixed
        temporary>
        <v-list
          nav
          dense>
          <v-list-item-group>
            <v-list-item to="/">
              <v-list-item-title>ホーム</v-list-item-title>
            </v-list-item>
            <v-list-item to="/tasks">
              <v-list-item-title>タスク</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </header>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="10" offset="1">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer center>
      <v-layout justify-center>
        <span>&copy; Matsushin. All Rights Reserved.</span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'Todo Sample',
      drawer: false
    }
  }
}
</script>
