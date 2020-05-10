<template>
  <div>
  <v-app-bar
    app
    :color="$scheme.main"
  >
    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

    <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
    <slot></slot>

  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    fixed
    temporary
  >
    <v-list
      nav
      dense
    >
      <v-list-item-group>
        <v-list-item
          v-if="$auth.isAuthenticated()"
          @click="authReset"
        >
          <v-list-item-icon>
            <v-avatar
              size=24
            >
              <img :src="$auth.userProfile.picture" :alt="$auth.userProfile.nickname"/>
            </v-avatar>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>

        <v-list-item
          v-else
          :href="$auth.URL"
        >
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>

        <v-list-item
          @click="drawer = false; dialog = true"
        >
          <v-list-item-icon><v-icon>mdi-magnify</v-icon></v-list-item-icon>
          <v-list-item-title>Channel</v-list-item-title>
        </v-list-item>

        <v-list-item
          @click="goHome"
        >
          <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>

  <v-dialog
    v-model="dialog"
    max-width=500
  >
    <v-card>
      <v-card-title>Connect Channel</v-card-title>
      <v-card-text class="text-justify">
        <p>Connecting to specified Twitch channel.</p>
        <v-text-field
          v-model="channel"
          outlined
          dense
          persistent-hint
          autofocus
          label="Channel"
          hint="In lowercase."
          append-icon="mdi-magnify"
        >
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="orange darken-1"
          text
          @click="dialog = false"
        >
          Cancel
        </v-btn>

        <v-btn
          color="green darken-1"
          text
          @click="joinChannel"
        >
          Connect
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </div>
</template>

<script>
export default {
  name: "AppBar",

  data: () => ({
    channel: "",
    drawer: false,
    dialog: false,
  }),

  methods: {
    joinChannel: function () {
      this.$router.push({ name: "Chat", params: { channel: this.channel } })
    },
    authReset: function () {
      this.$auth.reset()
      this.goHome()
    },
    goHome: function () {
      this.$router.go({ name: "Home" })
    }
  },

  computed: {
    isHome: function () {
      return this.$route.name == "Home" ? true : false
    }
  }
}
</script>
