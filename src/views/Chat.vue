<template>
  <div class="chat">
    <AppBar>

      <v-spacer></v-spacer>

      <v-btn
        @click="soundVolume = applyVolume"
        :color="$scheme.main"
        depressed
      >
        <v-icon v-if="soundVolume.level === 0">mdi-volume-off</v-icon>
        <v-icon v-else-if="soundVolume.level === 1">mdi-volume-low</v-icon>
        <v-icon v-else-if="soundVolume.level === 2">mdi-volume-medium</v-icon>
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
          v-for="(comment, index) in commentData"
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
              v-model="userMessage"
              :disabled="!isLogedIn"
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
import SndMsgSE from '@/assets/sounds/SoundEffect001.mp3'
import RcvMsgSE from '@/assets/sounds/SoundEffect002.mp3'

export default {
  name: 'Chat',
  data: () => ({
    msgs: [],
    wss: null,
    userMessage: '',
    autoScrollFlag: true,

    soundVolume: { level: 3, volume: .9 },
    volumeLevel: [
      { level: 0, volume: .0 },
      { level: 1, volume: .3 },
      { level: 2, volume: .6 },
      { level: 3, volume: .9 },
    ]
  }),
  props: {
    channel: String
  },
  components: {
    AppBar
  },
  created: function () {
    if (this.$props.channel != 'EMPTY') {
      this.connect()
    }
  },
  methods: {
    autoScroll: function () {
      window.scrollTo(0, document.body.clientHeight)
    },
    sendMessage: function () {
      if (this.wss != null && this.userMessage != "") {
        this.wss.send(`PRIVMSG #${this.$props.channel} :${this.userMessage}`)
        this.msgs.push(`display-name=${this.$userProfile.displayName};user-type=:PRIVMSG:${this.userMessage}`)
        this.userMessage = ""
      }
      this.$playSound(SndMsgSE, this.soundVolume.volume)
    },
    connect: function () {
      const self = this

      // ref: https://dev.twitch.tv/docs/irc/guide/
      self.wss = new WebSocket('wss://irc-ws.chat.twitch.tv:443')

      self.wss.onopen = function () {
        self.wss.send('CAP REQ :twitch.tv/tags twitch.tv/commands\r\n')
        self.wss.send(`PASS oauth:${self.$userProfile.pass}\r\n`)
        self.wss.send(`NICK ${self.$userProfile.loginName}\r\n`)
        self.wss.send(`JOIN #${self.$props.channel}\r\n`)
      }

      self.wss.onmessage = function (event) {
        if (event.data.startsWith('PING')) {
          self.wss.send('PONG :tmi.twitch.tv\r\n')
        } else {
          self.msgs.push(event.data)
          if (event.data.match(/PRIVMSG/)) {
            self.$playSound(RcvMsgSE, self.soundVolume.volume)
          }
        }
      }
    }
  },
  computed: {
    isLogedIn: function () {
      if (this.$userProfile.id === "") {
        return false
      } else {
        return true
      }
    },
    privmsgs: function () {
      return this.msgs.filter(
        (value) => (value.match(/PRIVMSG/))
      ).map(
        (value) => (value.split(';'))
      ).map((value) => (
        value.map(
          function (value) {
            var dict = {}
            dict[value.split('=')[0]] = value.substr(value.indexOf('=')+1)
            return dict
          }
        )
      )).map((value) => (
        value.reduce((a,b) => Object.assign(a,b,{}))
      ))
    },
    commentData: function () {
      return this.privmsgs.map(
        function (value) {
          return {
            username: value['display-name'],
            content: value['user-type'].split(':').slice(2).join(':')
          }
        }
      )
    },
    applyVolume: function() {
      return this.volumeLevel.filter(value => value.level === (this.soundVolume.level + 1) % 4)[0]
    }
  },
  watch: {
    msgs: function () {
      if (this.autoScrollFlag) {
        window.setTimeout(this.autoScroll, 100)
      }
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
}
</style>