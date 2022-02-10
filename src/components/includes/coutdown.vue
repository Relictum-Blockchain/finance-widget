<template lang="pug">
  span {{ clockTime }}
</template>

<script>
export default {
  data() {
    return {
      dataTime: this.time,
      interval: null
    }
  },
  computed: {
    clockTime() {
      let time = this.dataTime;
      let m = Math.floor(time / 60);
      let s = time % 60;
      return `${m}:${s < 10 ? '0' + s : s}`;
    }
  },
  props: {
    time: {
      type: Number,
      default: 120
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    this.initTimer()
  },
  methods: {
    initTimer() {
      this.interval = setInterval(() => {
        this.dataTime--;
        this.$emit('timer', this.dataTime);
        if (this.dataTime === 0) {
          clearInterval(this.interval)
        }
      }, 1000)
    }
  }

}
</script>