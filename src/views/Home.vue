<template>
  <div class="home">
    <AppBar/>
    <v-content>
      <v-container>
        <v-row dense>
          <v-col
            v-for="(stream, index) in streams"
            :key="index"
            sm=6 md=4 lg=3 xl=2 cols=12
          >
            <v-hover>
              <template v-slot="{ hover }">
            <v-card
              class="text-left"
              color="brown lighten-5"
              :elevation="hover ? 24 : 6"
              @click="joinChannel(stream.user_id)"
            >
              <v-img
                :src="sizing(stream.thumbnail_url)"
                class="align-end text-right"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height=120
              >
                <v-chip color="rgba(0,0,0,0)" class="amber--text">
                  <v-icon color="amber">mdi-account-multiple</v-icon>
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
import AppBar from '@/components/AppBar';

export default {
  name: 'Home',
  data: () => ({
    streams: [],
    thumb: {
      width: 640,
      height: 360
    }
  }),
  components: {
    AppBar
  },
  created: function () {
    this.fetchStreams()
  },
  methods: {
    fetchStreams: function () {
      var customHeader = { headers: { "Authorization": `Bearer ${this.$userProfile.pass}` } }
      this.$http.get("https://api.twitch.tv/helix/streams", customHeader)
                .then(response => (this.streams = response.data.data))
    },
    sizing: function (src) {
      return src.replace('{width}', `${this.thumb.width}`).replace('{height}', `${this.thumb.height}`)
    },
    joinChannel: async function (id) {
      if (this.isLogedIn) {
        var customHeader = { headers: {'Authorization': `Bearer ${this.$userProfile.pass}`} }
        this.$http.get(`https://api.twitch.tv/helix/users?id=${id}`, customHeader)
        .then(response => (this.$router.push({ name: "Chat", params: { channel: response.data.data[0].login } })))
      }
    },
  },
  computed: {
    isLogedIn: function () {
      if (this.$userProfile.id === "") {
        return false
      } else {
        return true
      }
    },
  }
}
</script>
