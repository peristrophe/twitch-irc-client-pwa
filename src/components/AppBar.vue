<template>
  <div>
  <v-app-bar
    app
    :color="$scheme.main"
  >
    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

    <v-toolbar-title>{{ $route.name }}</v-toolbar-title>

    <template v-if="isChat">
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
    fixed
    temporary
  >
    <v-list
      nav
      dense
    >
      <v-list-item-group>
        <v-list-item
          v-if="isLogedIn"
          @click="logOut"
        >
          <v-list-item-icon>
            <v-avatar
              size=24
            >
              <img :src="$userProfile.picture" :alt="$userProfile.displayName"/>
            </v-avatar>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>

        <v-list-item
          v-else
          :href="authURL"
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
          :disabled="isHome"
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
    autoScroll: true,
    channel: "",
    drawer: false,
    dialog: false,

    authParams: {
      client_id: "122xg9vquuuq3zi6w610iibumg5j15",
      redirect_uri: location.href.split("#")[0].split("?")[0],
      response_type: [ "token", "id_token" ],
      scope: [ "chat:read", "chat:edit", "user:read:email", "openid" ],
      claims: {
        id_token: {
          email_verified: null,
          picture: null,
          preferred_username: null
        }
      }
    }
  }),
  methods: {
    joinChannel: function () {
      this.$router.push({ name: "Chat", params: { channel: this.channel } })
    },
    logOut: function () {
      this.drawer = false
      this.$userProfile.id = ""
      this.$userProfile.loginName = "justinfan12345"
      this.$userProfile.displayName = "Anonymous User"
      this.$userProfile.picture = ""
      this.$accessToken = ""
      this.$idToken = {}
      document.location.hash = ""
      document.location.reload()
    }
  },
  computed: {
    isChat: function () {
      return this.$route.name == "Chat" ? true : false
    },
    isHome: function () {
      return this.$route.name == "Home" ? true : false
    },
    isLogedIn: function () {
      if (this.$userProfile.id === "") {
        return false
      } else {
        return true
      }
    },
    authURL: function () {
      return `https://id.twitch.tv/oauth2/authorize?${this.queryParams}`
    },
    queryParams: function () {
      const params = this.authParams

      function serialize (key) {
        if (Object.prototype.toString.call(params[key]).indexOf("Array") != -1) {
          return key + "=" + params[key].join("+")
        } else if (Object.prototype.toString.call(params[key]).indexOf("Object") != -1) {
          return key + "=" + JSON.stringify(params[key])
        } else {
          return key + "=" + params[key]
        }
      }

      return Object.keys(this.authParams).map(serialize).join("&")
    }
  },
  watch: {
    autoScroll: function () {
      this.$emit('switch-auto-scroll', this.autoScroll)
    }
  }
}
</script>