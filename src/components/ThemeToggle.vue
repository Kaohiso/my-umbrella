<script lang="ts">
export default {
  data() {
    return {
      lightMode: localStorage.getItem('lightMode') || false,
    }
  },
  watch: {
    lightMode: function () {
      localStorage.setItem('lightMode', JSON.stringify(this.lightMode))
      console.log(this.lightMode)
    },
  },
}
</script>

<template>
  <div :class="{ 'theme-light': lightMode }">
    <input type="checkbox" id="theme-toggle" v-model="lightMode" />
    <label for="theme-toggle">
      <span>Toggle</span>
    </label>
  </div>
</template>
