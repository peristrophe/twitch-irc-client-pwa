<template>
  <div>
  <v-app-bar
    app
    :color="$scheme.main"
  >
    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

    <v-toolbar-title>{{ $route.name }}</v-toolbar-title>

    <template v-if="$route.name == 'Chat'">
      <v-spacer></v-spacer>

      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn
            v-model="autoScroll"
            @click="autoScroll = !autoScroll"
            :color="$scheme.main"
            depressed
            v-on="on"
          >
            <v-icon>mdi-transfer-down</v-icon>
          </v-btn>
        </template>
      
        <span>Auto Scroll</span>
      </v-tooltip>
    </template>

  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    absolute
    temporary
  >
    <v-list
      nav
      dense
    >
      <v-list-item-group>
        <v-list-item>
          <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>

        <v-list-item
          @click="drawer = false; dialog = true"
        >
          <v-list-item-icon><v-icon>mdi-magnify</v-icon></v-list-item-icon>
          <v-list-item-title>Channel</v-list-item-title>
        </v-list-item>

        <v-list-item
          :href="$router.resolve({ name: 'Chat', params: { channel: 'EMPTY' } }).href"
        >
          <v-list-item-icon><v-icon>mdi-chat</v-icon></v-list-item-icon>
          <v-list-item-title>Chat</v-list-item-title>
        </v-list-item>

        <v-list-item
          :href="$router.resolve({ name: 'Home' }).href"
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
          @click="dialog = false"
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
    name: 'AppBar',

    data: () => ({
      autoScroll: true,
      channel: '',
      drawer: false,
      dialog: false,
    }),
  }
</script>