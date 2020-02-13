<template>
  <div id="app">
    <v-app>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',
  created: function () {
    this.storeProfile()
  },
  methods: {
    storeProfile: function () {
      if (this.hasValidHash) {
        this.$userProfile.id = this.decodedIdToken.sub
        this.$userProfile.picture = this.decodedIdToken.picture
        this.$userProfile.displayName = this.decodedIdToken.preferred_username
        this.$userProfile.pass = this.hashValues.access_token
        this.$userProfile.idToken = this.decodedIdToken

        var customHeader = { headers: {'Authorization': `Bearer ${this.$accessToken}`} }
        this.$http.get(`https://api.twitch.tv/helix/users?id=${this.$userProfile.id}`, customHeader)
                  .then(response => (this.$userProfile.loginName = response.data.data[0].login))
      }
    }
  },
  computed: {
    hashValues: function () {
      try {
        return document.location.hash.slice(1).split('&').map(
          function (value) {
            var dic = {}
            dic[value.split('=')[0]] = value.split('=')[1]
            return dic
          }
        ).reduce((a,b) => Object.assign(a,b,{}))
      } catch(e) {
        return null
      }
    },
    decodedIdToken: function () {
      try {
        return JSON.parse(this.$base64url.decode(this.hashValues.id_token.split('.')[1]))
      } catch(e) {
        return null
      }
    },
    hasValidHash: function () {
      if (this.decodedIdToken === null) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
