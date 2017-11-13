<template>
  <div class="kt-sample" :class="componentClasses" @click="triggerSample" @transitionend="removePadBackground">
    <template v-if="!isBlank">
      <span class="name">
        {{ index }}
      </span>
    </template>    
  </div>
</template>

<script>
const context = new (window.AudioContext || window.webkitAudioContext)()

export default {
  name: 'basic-pad',
  data () {
    return {
      audioBuffer: null,
      bufferSource: null,
      sampleLoaded: false,
      hasBeenTriggered: false,
      isPlaying: false,
      keyMap: {
        65: 0,
        83: 1,
        68: 2,
        70: 3,
        71: 4,
        72: 5,
        74: 6,
        75: 7,
        76: 8
      }
    }
  },
  mounted () {
    if (!this.isBlank) {
      this.loadSample()
      this.bindTriggerKey()
    }
  },
  props: {
    sample: {
      type: Object,
      default () {
        return {
          name: '_none_',
          source: null
        }
      }
    },
    index: {
      type: Number,
      default: 0
    },
    bankNumber: {
      type: Number,
      default: 0
    },
    isBlank: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    padBankIsInView () {
      return this.bankNumber === this.$store.state.bank
    },
    componentClasses () {
      return {
        'is-blank': this.isBlank,
        'has-been-triggered': this.hasBeenTriggered,
        'is-playing': this.isPlaying
      }
    }
  },
  methods: {
    bindTriggerKey () {
      window.addEventListener('keydown', e => {
        const code = e.keyCode
        const pad = this.keyMap[code]

        if (pad === this.index && this.padBankIsInView) {
          this.triggerSample()
        }
      })
    },
    loadSample () {
      const request = new XMLHttpRequest()
      request.open('GET', this.sample.source, true)
      request.responseType = 'arraybuffer'
      request.onload = () => {
        // decode audio from request to audio buffer
        context.decodeAudioData(request.response, buffer => {
          this.audioBuffer = buffer
          if (this.audioBuffer) {
            this.sampleLoaded = true
          }
        })
      }
      request.send()
    },
    triggerSample () {
      if (!this.sampleLoaded) return
      this.hasBeenTriggered = true
      if (this.isPlaying) {
        this.stopSource()
      } else {
        this.createBuffer()
        this.startSource()
      }
      if (!this.bufferSource.onended) {
        this.bufferSource.onended = () => {
          this.isPlaying = false
        }
      }
    },
    createBuffer () {
      this.bufferSource = context.createBufferSource()
      this.bufferSource.buffer = this.audioBuffer
      this.bufferSource.connect(context.destination)
    },
    startSource () {
      this.bufferSource.start(0)
      this.isPlaying = true
      this.$store.dispatch('setSampleInfo', {
        name: this.sample.name,
        length: `${this.audioBuffer.duration.toFixed(2)}s`
      })
    },
    stopSource () {
      this.bufferSource.stop()
      this.isPlaying = false
      console.log(this.bufferSource)
    },
    removePadBackground (e) {
      if (e.propertyName === 'background-color') {
        this.hasBeenTriggered = false
      }
    }
  }
}
</script>

<style lang="scss">
.kt-sample {
  color: #444;
  border: 2px solid;
  border-radius: 5px;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 100px;
  cursor: pointer;
  user-select: none;
  transition: all 0.1s linear;
  &.is-blank {
    background: #666;
  }
  &.has-been-triggered {
    background: crimson;
    border-color: crimson;
    color: crimson;
  }
  &.is-playing {
    
  }
  .name {
    width: 60%;
  }
}
</style>