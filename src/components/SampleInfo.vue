<template>
  <div class="sample-info">
    <span v-if="lastPlayed">
      {{ lastPlayed.name }}
      {{ lastPlayed.length }}
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'sample-info',
  created () {
    this.$store.dispatch('getSamples')
  },
  computed: {
    ...mapState({
      lastPlayed: state => state.lastPlayed
    })
  }
}
</script>

<style lang="scss">
  .sample-info {
    display: inline-block;
    width: 20%;
  }


</style>
