<template>
  <div class="pad-viewer">
    <button @click="goToPrevBank">&#9650;</button>
    <button @click="goToNextBank">&#9660;</button>
    <template v-for="(bank, index) in banks">
      <div v-show="index === currentBankInView" :key="`Bank_${index + 1}`">
        <h3>Bank {{ index + 1 | leftPad }}</h3>
        <pad-group :samples="bank"></pad-group>
      </div>      
    </template>
  </div>
</template>

<script>
import PadGroup from './PadGroup'

export default {
  name: 'pad-viewer',
  props: {
    banks: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentBankInView: 0
    }
  },
  methods: {
    goToPrevBank () {
      if (this.currentBankInView > 0) {
        this.currentBankInView --
      }
    },
    goToNextBank () {
      if (this.currentBankInView < this.banks.length - 1) {
        this.currentBankInView ++
      }
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

</style>