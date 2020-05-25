
import config from "@/utils/config.js"
import axios from "axios"
import base64url from "base64url"

const authBase = "https://id.twitch.tv/oauth2/authorize?"

const defaultUserProfile = {
    id: "",
    name: "justinfan12345",
    nickname: "Anonymous User",
    picture: "",
    pass: "",
    idToken: ""
}

const authParams = {
    client_id: config.clientId,
    redirect_uri: `${location.origin}/tirc/`,
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

const serialize = (key) => {
    if (Object.prototype.toString.call(authParams[key]).indexOf("Array") != -1) {
        return key + "=" + authParams[key].join("+")
    } else if (Object.prototype.toString.call(authParams[key]).indexOf("Object") != -1) {
        return key + "=" + JSON.stringify(authParams[key])
    } else {
        return key + "=" + authParams[key]
    }
}

const createAuthURL = () => authBase + Object.keys(authParams).map(serialize).join("&")

const hashValues = () => {
    try {
        return document.location.hash.slice(1).split("&").map(function (value) {
                var dic = {}
                dic[value.split('=')[0]] = value.split('=')[1]
                return dic
            }).reduce((a,b) => Object.assign(a,b,{}))
    } catch(e) {
        return null
    }
}

const decodedIdToken = () => {
    try {
        return JSON.parse(base64url.decode(hashValues().id_token.split(".")[1]))
    } catch(e) {
        return null
    }
}

export default {
    userProfile: defaultUserProfile,
    URL: createAuthURL(),

    store: function () {
        var decoded = decodedIdToken()
        var hash = hashValues()
        if (decoded !== null) {
            this.userProfile = {
                id: decoded.sub,
                name: null,
                nickname: decoded.preferred_username,
                picture: decoded.picture,
                pass: hash.access_token,
                idToken: decoded
            }

            var customHeader = { headers: {"Client-ID": config.clientId, "Authorization": `Bearer ${this.userProfile.pass}`} }
            axios.get(`https://api.twitch.tv/helix/users?id=${this.userProfile.id}`, customHeader)
                .then(response => (this.userProfile.name = response.data.data[0].login))
        }
    },

    isAuthenticated: function () {
        return this.userProfile.id === "" ? false : true
    },

    reset: function () {
        document.location.hash = ""
        this.userProfile = defaultUserProfile
    },
}
