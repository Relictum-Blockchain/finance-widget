<template lang="pug">
  .field(:class="{'field_slot': $slots.default, [cls]: cls, 'hidden': type === 'hidden', 'vs': type !== 'select' }")
    .field__wrap(v-if="type !== 'select'")
      span.field__label(v-if="label") {{ label }}
      input.field__input(v-model="data" @keyup="$emit('keyup', data)" :required="required" :type="type" :inputmode="type === 'number' ? 'numeric' : null" :pattern="pattern" :placeholder="placeholder" @input="$emit('input', data)")
      .field__slot
        slot
    .field__wrap(v-else)
      span.field__label(v-if="label") {{ label }}
      .field__input
        multiselect(v-model="data" track-by="text" label="text" :show-labels="false" :allow-empty="false" :options="options" @select="$emit('input', data)")
</template>

<script>
export default {
  data() {
    return {
      data: this.value
    }
  },
  watch: {
    value(val) {
      this.data = val;
    }
  },
  computed: {
    pattern() {
      let pattern = null
      if(this.type === 'number' && !this.validate) pattern = '[0-9]*'
      if(this.validate) pattern = this.validate;
      return pattern;
    }
  },
  props: {
    label: {
      type: String
    },
    value: {
      type: [String, Number, Object]
    },
    placeholder: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    required: {
      type: String
    },
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    cls: {
      type: String
    },
    validate: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    },
  }
}
</script>