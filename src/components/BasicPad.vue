<template>
  <div class="kt-sample" :class="componentClasses" @click="playSample" @transitionend="removePadBackground">
    <template v-if="!isBlank">
      <span class="name">
        {{ sample.name }}
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
      sampleLoaded: false,
      hasBeenTriggered: false,
      isPlaying: false
    }
  },
  mounted () {
    if (!this.isBlank) {
      this.loadSample()
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
    isBlank: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    componentClasses () {
      return {
        'is-blank': this.isBlank,
        'has-been-triggered': this.hasBeenTriggered,
        'is-playing': this.isPlaying
      }
    }
  },
  methods: {
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
    playSample () {
      if (this.sampleLoaded) {
        this.hasBeenTriggered = true

        const bufferSource = context.createBufferSource()
        bufferSource.buffer = this.audioBuffer
        bufferSource.connect(context.destination)
        bufferSource.start(0)
        this.isPlaying = true
        bufferSource.onended = () => {
          this.isPlaying = false
        }
        console.log(context, this.audioBuffer)
      }
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
  transition: all 0.2s linear, background-color 0.1s linear;
  &.is-blank {
    background: #666;
  }
  &.has-been-triggered {
    background: crimson;
  }
  &.is-playing {
    border-color: crimson;
    color: crimson;
  }
}
</style>