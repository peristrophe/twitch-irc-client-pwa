import axios from "axios"
import config from "@/utils/config"
import ThumbAuth from "@/assets/images/ThumbAuthPW.png"

const sizeMap = [
    { scale: 1, width: 320,  height: 180  },
    { scale: 2, width: 480,  height: 270  },
    { scale: 3, width: 640,  height: 360  },
    { scale: 4, width: 1280, height: 720  },
    { scale: 5, width: 1920, height: 1080 },
]

const defaultContents = [
    {
        user_id: null,
        thumbnail_url: ThumbAuth,
        title: "You are an anonymous user now. You can use it as it is. If you authentication, become can send message from this app.",
        user_name: "Enjoy Twitch IRC",
        viewer_count: null
    }
]

const pickSize = (scale) => sizeMap.filter((item) => item.scale === scale)[0]

export default {
    profile: null,
    streams: defaultContents,

    fetchStreams: function () {
        const customHeader = { headers: { "Client-ID": config.clientId, "Authorization": `Bearer ${this.profile.pass}` } }
        axios.get("https://api.twitch.tv/helix/streams", customHeader)
             .then(response => (this.streams = response.data.data))
    },

    resolveThumbSize: function (src, scale = 3) {
        return src.replace("{width}", `${pickSize(scale).width}`).replace("{height}", `${pickSize(scale).height}`)
    },

    resolveChannel: function (userId, callback) {
        const customHeader = { headers: {"Client-ID": config.clientId, "Authorization": `Bearer ${this.profile.pass}`} }
        axios.get(`https://api.twitch.tv/helix/users?id=${userId}`, customHeader).then(callback)
    },

    idToChannel: function (userId) {
        const request = new XMLHttpRequest()
        request.open("GET", `https://api.twitch.tv/helix/users?id=${userId}`, false)
        request.setRequestHeader("Authorization", `Bearer ${this.profile.pass}`)
        request.send(null)

        return request.status === 200
            ? JSON.parse(request.responseText).data[0].login
            : null
    },

    reset: function () {
        this.streams = defaultContents
    }
}