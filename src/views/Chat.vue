<template>
  <div>
    <AppBar/>
    
    <v-content>

    </v-content>
    <v-footer
      app
      :color="$scheme.main"
    >
      <v-text-field
        outlined
        dense
        rounded
        hide-details
        clearable
        label="Your Message"
        :color="$scheme.fore"
        prepend-inner-icon="mdi-chat"
        append-outer-icon="mdi-telegram"
        @click:append-outer="sendMessage"
      >
      </v-text-field>
    </v-footer>
  </div>
</template>

<script>
import AppBar from '@/components/AppBar';

export default {
  name: 'Chat',
  components: {
    AppBar
  },
  methods: {
    sendMessage: function () {
      void(0)
    }
  }
}
</script>
