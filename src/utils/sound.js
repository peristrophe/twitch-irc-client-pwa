import SndMsgSE from "@/assets/sounds/SoundEffect001.mp3"
import RcvMsgSE from "@/assets/sounds/SoundEffect002.mp3"

const resourceMap = [
    { id: "SendMessage",    src: SndMsgSE },
    { id: "RecieveMessage", src: RcvMsgSE },
]

const volumeMap = [
    { level: 0, quantity: .0 },
    { level: 1, quantity: .3 },
    { level: 2, quantity: .6 },
    { level: 3, quantity: .9 },
]

const pickVolume = (level) => volumeMap.filter((item) => item.level === level)[0]

export default {
    volume: pickVolume(0),

    toggleVolume: function () {
        this.volume = volumeMap.filter((item) => item.level === (this.volume.level + 1) % 4)[0]
    },
    play: function (id) {
        var src = resourceMap.filter((item) => item.id === id)[0].src
        var audio = new Audio(src)
        audio.volume = this.volume.quantity
        audio.play()
    }
}