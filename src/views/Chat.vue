<template>
  <div class="chat">
    <AppBar>

      <v-spacer></v-spacer>

      <v-btn
        @click="sound.toggleVolume()"
        :color="$scheme.main"
        depressed
      >
        <v-icon v-if="sound.volume.level === 0">mdi-volume-off</v-icon>
        <v-icon v-else-if="sound.volume.level === 1">mdi-volume-low</v-icon>
        <v-icon v-else-if="sound.volume.level === 2">mdi-volume-medium</v-icon>
        <v-icon v-else>mdi-volume-high</v-icon>
      </v-btn>

      <v-btn
        @click="autoScrollFlag = !autoScrollFlag"
        :color="$scheme.main"
        depressed
      >
        <v-icon v-if="autoScrollFlag">mdi-download</v-icon>
        <v-icon v-else>mdi-download-off</v-icon>
      </v-btn>

    </AppBar>
    
    <v-content>
      <v-container>
        <div
          v-for="(comment, index) in irc.chatlog()"
          :key="index"
          class="comment"
        >
          <v-row dense justify="center" class="content">
            <v-col class="text-left">{{ comment.content }}</v-col>
          </v-row>
          <v-row dense justify="center" class="username">
            <v-col align-self="end" class="text-right">{{ comment.username }}</v-col>
          </v-row>
          <v-row dense>
            <v-col><v-divider></v-divider></v-col>
          </v-row>
        </div>
      </v-container>
    </v-content>

    <v-footer
      app
      :color="$scheme.main"
      elevation=24
    >
      <v-container>
        <v-row dense class="justify-center">
          <v-col sm=6 md=6 lg=6 xl=6 cols=12>
            <v-text-field
              v-model="postMessage"
              :disabled="!$auth.isAuthenticated()"
              light
              outlined
              dense
              rounded
              hide-details
              clearable
              label="Your Message"
              prepend-inner-icon="mdi-chat"
              append-outer-icon="mdi-telegram"
              @click:append-outer="sendMessage"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </div>
</template>

<script>
import AppBar from '@/components/AppBar'
import IRC from '@/utils/twIRC'
import Sound from '@/utils/sound'

export default {
  name: 'Chat',

  data: () => ({
    postMessage: '',
    autoScrollFlag: true,
    irc: IRC,
    sound: Sound,
  }),

  props: {
    channel: { type: String, default: null }
  },

  components: {
    AppBar
  },

  created: function () {
    if (this.$props.channel !== null) {
      this.irc.join(this.$props.channel, this.$auth.userProfile)
    }
  },

  methods: {
    autoScroll: function () {
      window.scrollTo(0, document.body.clientHeight)
    },
    sendMessage: function () {
      this.irc.post(this.postMessage, this.$auth.userProfile)
      this.sound.play('SendMessage')
    }
  },

  watch: {
    'irc.prvSize': function () {
      if (this.autoScrollFlag) {
        window.setTimeout(this.autoScroll, 100)
      }
      this.sound.play('RecieveMessage')
    }
  }
}
</script>

<style>
.comment {
  max-width: 600px;
  margin: auto;
}
.comment .content {
  overflow-wrap: break-word;
}
.comment .username {
  font-size: 12px;
  font-weight: bold;
  margin-top: -10px;
}
</style>