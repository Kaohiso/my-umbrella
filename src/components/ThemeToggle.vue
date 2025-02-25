<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: Boolean, // This allows v-model support
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <input
      type="checkbox"
      id="theme-toggle"
      :checked="modelValue"
      @change="emit('update:modelValue', !modelValue)"
    />
    <label for="theme-toggle">
      <span></span>
    </label>
  </div>
</template>

<style>
:root {
  --toggle-size: 0.7rem;
  --switch-w: 4em;
  --switch-h: 2em;
  --switch-handle-scale: 0.65;
  --switch-off-handle-x: -0.125em;
  --switch-on-handle-x: calc(100% - 0.125em);
  --switch-transition-duration: 0.2s;
}

#theme-toggle {
  display: none;
}

#theme-toggle + label {
  font-size: var(--toggle-size);
  display: flex;
  align-items: center;
  height: var(--switch-h);
  width: var(--switch-w);
  border-radius: calc(var(--switch-h) / 2);
  background-size: auto 8em;
  background-position: bottom;
  background-image: linear-gradient(to right, rgb(37, 45, 55), rgba(37, 45, 55, 0.5));
  transition: var(--switch-transition-duration);
  overflow: hidden;
}

#theme-toggle + label span {
  background: transparent;
  transform: translateX(var(--switch-on-handle-x)) scale(var(--switch-handle-scale));
  box-shadow:
    inset -0.1875em -0.1875em 0 0 #fbe7ef,
    inset -0.5625em -0.5625em 0 0 #fffff7,
    rgba(255, 255, 255, 0.5) 0em -0.2em 0 -1em;
  transition: var(--switch-transition-duration);
  border-radius: 50%;
  height: var(--switch-h);
  width: var(--switch-h);
  cursor: pointer;
  margin-top: var(--switch-off-handle-x);
}

#theme-toggle:checked + label {
  background-image: linear-gradient(to right, #95c4ff, #117af5);
}

#theme-toggle:checked + label span {
  background: #fffad8;
  transform: translateX(var(--switch-off-handle-x)) scale(var(--switch-handle-scale));
  box-shadow:
    0 0 0.25em 0.0625em #fbee8d,
    0 0 2em 0 #ffeb3b,
    inset -0.25em -0.25em 0 0 #fbee8e,
    inset -0.3125em -0.3125em 0 0.625em #fff5b2;
}
</style>
