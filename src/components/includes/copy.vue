<template lang="pug">
  button.copy-btn(@click="go_copy()" :class="{'done': done}")
    span(v-if="done") {{ doneText }}
    span(v-else) {{ copyText }}
</template>

<script>
export default {
  data() {
    return {
      done: false
    }
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    copyText: {
      type: String,
      default: 'Скопировать'
    },
    doneText: {
      type: String,
      default: 'Скопировано'
    }
  },
  methods: {
    go_copy() {
      if(this.done) return;
      this.done = true;
      this.copyToClipboard(this.text);
      setTimeout(() => {
        this.done = false;
      }, 350)
    },
    copyToClipboard(text) {
      if (window.clipboardData && window.clipboardData.setData) {
          return window.clipboardData.setData("Text", text);
      } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
          var textarea = document.createElement("textarea");
          textarea.textContent = text;
          textarea.style.position = "fixed";  
          document.body.appendChild(textarea);
          textarea.select();
          try {
              return document.execCommand("copy");  
          } catch (ex) {
              console.warn("Copy to clipboard failed.", ex);
              return false;
          } finally {
              document.body.removeChild(textarea);
          }
      }
    },
  }
}
</script>