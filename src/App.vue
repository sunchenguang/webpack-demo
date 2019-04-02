<template>
  <div class="test">
    1111122233445556666699999000999977777888999001111
    <div class="test-div">
      sssddddddddddddddd
      <p class="test-p">aaa</p>
      <span class="test-span">
        <span class="demo">ccc</span>
        bbb
      </span>
      <test/>
    </div>
    <svg-icon icon-class="bug" />
  </div>
</template>

<script>
import Test from './test'
export default {
  name: 'App',
  components: {
    Test
  },
  mixins: [],
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">
    .test {
        .test-div {
            color: red
        }

        .test-p {
            color: blue;
        }

        .test-span {
            color: yellow
        }
        .demo {
            color: gray;
        }
        .main {
            color: aqua;
        }
    }
</style>
