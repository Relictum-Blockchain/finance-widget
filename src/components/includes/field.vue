<template lang="pug">
  .field(:class="{'field_slot': $slots.default, [cls]: cls, 'hidden': type === 'hidden', 'vs': type !== 'select', 'error-field': vError }")
    .field__wrap(v-if="type !== 'select'")
      span.field__label(v-if="label") {{ label }}
      input.field__input(v-model="data" @keyup="$emit('keyup', data)" v-mask="mask" :required="required" :type="type" :inputmode="type === 'number' ? 'numeric' : null" :pattern="pattern" :placeholder="placeholder"  @input="emmiter()")
      .field__slot
        slot
    .field__wrap(v-else)
      span.field__label(v-if="label") {{ label }}
      .field__input
        multiselect(v-model="data" track-by="text" label="text" :placeholder="placeholder" :show-labels="false" :allow-empty="false" :options="options" @input="emmiter()" )
</template>

<script>
export default {
  data() {
    return {
      data: this.value,
      vError: this.error
    }
  },
  watch: {
    value(val) {
      this.data = val;
    },
    error(val) {
      this.vError = val;
    }
  },
  methods: {
    emmiter() {
      this.$emit('validUpdate', false);
      this.$emit('input', this.data)
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
    mask: {
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
    error: {
      type: Boolean
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