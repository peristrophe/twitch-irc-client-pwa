
const stateMap = [
    { code: 0, description: "CONNECTING" },
    { code: 1, description: "OPEN" },
    { code: 2, description: "CLOSING" },
    { code: 3, description: "CLOSED" },
]

const filterPriv = (msg) => msg
    .filter(
        (value) => value.match(/PRIVMSG/)
    ).map(
        (value) => value.split(';')
    ).map((value) => value
        .map((value) => {
            var dict = {}
            dict[value.split('=')[0]] = value.substr(value.indexOf('=')+1)
            return dict
        })
    ).map(
        (value) => value.reduce((a,b) => Object.assign(a,b,{}))
    )

const trimMsg = (msg) => filterPriv(msg)
    .map(
        (value) => (
            {
                username: value['display-name'],
                content: value['user-type'].split(':').slice(2).join(':')
            }
        )
    )

export default {
    rawMsgs: [],
    channel: null,
    websock: null,
    prvSize: 0,

    status: function () {
        return stateMap.filter(item => item.code === this.websock.readyState)[0].description
    },

    join: function (channel, profile) {
        const _this = this
        this.websock = new WebSocket("wss://irc-ws.chat.twitch.tv:443")

        this.websock.onopen = function () {
            _this.websock.send('CAP REQ :twitch.tv/tags twitch.tv/commands\r\n')
            _this.websock.send(`PASS oauth:${profile.pass}\r\n`)
            _this.websock.send(`NICK ${profile.name}\r\n`)
            _this.websock.send(`JOIN #${channel}\r\n`)
        }
        this.websock.onmessage = function (event) {
            if (event.data.startsWith('PING')) {
                _this.websock.send('PONG :tmi.twitch.tv\r\n')
            } else {
                _this.rawMsgs.push(event.data)
                _this.prvSize = filterPriv(_this.rawMsgs).length
            }
        }

        this.channel = channel
    },

    exit: function (close = true) {
        this.websock.send(`PART #${this.channel}`)
        if (close) {
            this.websock.close()
        }
    },

    post: function (message, profile) {
        this.websock.send(`PRIVMSG #${this.channel} :${message}\r\n`)
        this.rawMsgs.push(`display-name=${profile.loginName};user-type=:PRIVMSG:${message}`)
    },

    chatlog: function () {
        return trimMsg(this.rawMsgs)
    }

}