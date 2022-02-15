<template lang="pug">
  button.btn(:disabled="disabled" :class="cls")
    span {{ caption }}
</template>
<script>
export default {
  props: {
    caption: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    cls: {
      type: String
    }
  }
}
</script>