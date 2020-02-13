<template>
  <div class="chat">
    <AppBar v-on:switch-auto-scroll="switchAutoScroll"/>
    
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
import AppBar from '@/components/AppBar';

export default {
  name: 'Chat',
  data: () => ({
    msgs: [],
    wss: null,
    userMessage: '',
    autoScrollFlag: true,
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
    switchAutoScroll: function (value) {
      this.autoScrollFlag = value
    },
    autoScroll: function () {
      window.scrollTo(0, document.body.clientHeight)
    },
    sendMessage: function () {
      if (this.wss != null && this.userMessage != "") {
        this.wss.send(`PRIVMSG #${this.$props.channel} :${this.userMessage}`)
      }
      this.userMessage = ""
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