<template>
  <div class="home">
    <AppBar/>
    <v-content>
      <v-container>
        <v-row dense>

          <v-col
            v-for="(stream, index) in contents.streams"
            :key="index"
            sm=6 md=4 lg=3 xl=2 cols=12
          >
            <v-hover>
              <template v-slot="{ hover }">
            <v-card
              class="text-left"
              color="brown lighten-5"
              :elevation="hover ? 24 : 6"
              @click="goChannel(stream.user_id)"
            >
              <v-img
                :src="contents.resolveThumbSize(stream.thumbnail_url)"
                class="align-end text-right"
                height=120
              >
                <v-chip v-if="stream.viewer_count !== null" label color="rgba(0,0,0,0.5)" class="amber--text ma-1">
                  <v-icon left color="amber">mdi-account-multiple</v-icon>
                  <b>{{ stream.viewer_count }}</b>
                </v-chip>
              </v-img>
              <v-card-text v-text="stream.title"></v-card-text>
              <v-card-title v-text="stream.user_name"></v-card-title>
            </v-card>
              </template>
            </v-hover>
          </v-col>

        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import AppBar from "@/components/AppBar"
import Contents from "@/utils/contents"

export default {
  name: "Home",

  data: () => ({
    contents: Contents
  }),

  components: {
    AppBar
  },

  created: function () {
    this.contents.reset()
    this.contents.profile = this.$auth.userProfile
    if (this.$auth.isAuthenticated()) {
      this.contents.fetchStreams()
    }
  },

  methods: {
    goAuth: function () {
      this.$router.push({ name: "Auth" })
    },
    goChannel: function (userId) {
      if (userId === null) {
        this.goAuth()
      } else {
        this.contents.resolveChannel(userId, (res) => this.$router.push({ name: "Chat", params: { channel: res.data.data[0].login } }))
      }
    }
  }
}
</script>
