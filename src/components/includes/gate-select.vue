<template lang="pug">
  multiselect.buy-select(v-if="gates.length" v-model="currentGate" placeholder="Выберите вариант" track-by="name" label="name" :show-labels="false" :options="gates" :allow-empty="false")
    template(slot="singleLabel", slot-scope="{ option }")
      .buy-select__option
        .buy-select__option-img
          img(:src="option.info.data.icon", alt="alt")
        .buy-select__option-info
          b.buy-select__option-title {{ option.name }}
    template(slot="option", slot-scope="props")
      .buy-select__option
        .buy-select__option-img
          img(:src="props.option.info.data.icon", alt="alt")
        .buy-select__option-info
          b.buy-select__option-title {{ props.option.name }}
          span.buy-select__option-caption {{ props.option.info.title }}
</template>

<script>
export default {
  computed: {
    currentGate: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  props: {
    value: {
      type: Object,
      requred: true,
    },
    gates: {
      type: Array,
      required: true
    }
  }
}
</script>