<template>
  <section class="pad-group pads-9">
    <template v-for="sample in samples">
      <basic-pad :key="sample.name" :sample="sample"></basic-pad>
    </template>
    <!-- Render Blank Pads to make up even grid -->
    <template v-for="r, i in remainder">
      <basic-pad :key="`blank_${i}`" :isBlank="true"></basic-pad>
    </template>  
  </section>
</template>

<script>
import BasicPad from './BasicPad'
import { mapState } from 'vuex'

export default {
  name: 'pad-group',
  props: {
    samples: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    ...mapState({
      bankLength: state => state.bankLength
    }),
    remainder () {
      const r = this.bankLength - this.samples.length
      return r
    }
  },
  components: {
    BasicPad
  }
}
</script>

<style lang="scss">
  .pad-group {
    width: 600px;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(3, 100px);
    grid-auto-rows: 100px;
  }

</style>