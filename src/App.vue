<template>
  <div id="app">
    <h1>Kitttopia</h1>
    <pad-viewer :banks="banks"></pad-viewer>
  </div>
</template>

<script>
import PadViewer from './components/PadViewer'
import { mapState } from 'vuex'

export default {
  name: 'app',
  created () {
    this.$store.dispatch('getSamples')
  },
  computed: {
    ...mapState({
      banks: state => state.banks
    })
  },
  components: {
    PadViewer
  }
}
</script>

<style lang="scss">



</style>
