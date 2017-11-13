<template>
  <div class="pad-viewer">
    <slot></slot>
    <template v-for="(bank, index) in banks">
      <div v-show="index === currentBankInView" :key="`Bank_${index + 1}`">
        <pad-group :samples="bank" :bankNumber="index + 1"></pad-group>
        <h4>Bank {{ index + 1 | leftPad }} of {{ banks.length | leftPad}}</h4>        
      </div>      
    </template>
    <button @click="goToPrevBank">&#9650;</button>
    <button @click="goToNextBank">&#9660;</button>
  </div>
</template>

<script>
import PadGroup from './PadGroup'

export default {
  name: 'pad-viewer',
  data () {
    return {
      currentBankInView: 0,
      keyMap: {
        88: this.goToNextBank,
        90: this.goToPrevBank
      }
    }
  },
  props: {
    banks: {
      type: Array,
      default () {
        return []
      }
    }
  },
  mounted () {
    this.bindNavigation()
  },
  methods: {
    goToPrevBank () {
      if (this.currentBankInView > 0) {
        this.currentBankInView --
        this.$store.dispatch('setCurrentBank', this.currentBankInView + 1)
      }
    },
    goToNextBank () {
      if (this.currentBankInView < this.banks.length - 1) {
        this.currentBankInView ++
        this.$store.dispatch('setCurrentBank', this.currentBankInView + 1)
      }
    },
    bindNavigation () {
      window.addEventListener('keydown', e => {
        const code = e.keyCode
        const action = this.keyMap[code]

        if (action) action()
      })
    }
  },
  filters: {
    leftPad (value) {
      return value < 9 ? `0${value}` : value
    }
  },
  components: {
    PadGroup
  }
}
</script>

<style lang="scss">
  .pad-viewer {
    display: inline-block;
    width: 50%;
  }
</style>