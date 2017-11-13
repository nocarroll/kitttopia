<template>
  <div id="app">
    <template v-if="!loaded">
      <span>Loading...</span>
    </template>
    <template v-if="loaded && !error">
      <h1>Kitttopia</h1>
      <pad-viewer :banks="banks">
        <sample-info></sample-info>
      </pad-viewer>
    </template>
    <template v-if="loaded && error">
      <h2>There was an error fetching the requested pack...</h2>
    </template>
  </div>
</template>

<script>
import PadViewer from './components/PadViewer'
import SampleInfo from './components/SampleInfo'
import { mapState } from 'vuex'

export default {
  name: 'app',
  created () {
    this.$store.dispatch('getSamples')
  },
  computed: {
    ...mapState({
      loaded: state => state.loaded,
      banks: state => state.banks,
      error: state => state.error
    })
  },
  components: {
    PadViewer,
    SampleInfo
  }
}
</script>

<style lang="scss">

</style>
