<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

const lightMode = ref(JSON.parse(localStorage.getItem('lightMode') || 'false'))

watch(lightMode, (newValue) => {
  localStorage.setItem('lightMode', JSON.stringify(newValue))
})
</script>

<template>
  <body :class="{ 'theme-light': lightMode }">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About me</RouterLink>
      <div>
        <input type="checkbox" id="theme-toggle" v-model="lightMode" />
        <label for="theme-toggle">
          <span></span>
        </label>
      </div>
    </nav>
    <HelloWorld />
  </body>
</template>

<style>
nav {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-size: 18px;
  gap: 1rem;
}

nav a {
  display: inline-block;
  font-weight: bold;
  text-decoration: none;
  color: var(--color-text);
}

nav a::after {
  display: block;
  content: '';
  transform: scaleX(0);
  transition: transform 150ms ease-in-out;
  border-bottom: 3px solid var(--vt-c-royalblue);
  transform-origin: 0% 50%;
}

nav a:hover::after,
nav a.router-link-exact-active::after {
  transform: scaleX(1);
}

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

  & + label {
    font-size: var(--toggle-size);
    display: flex;
    align-items: center; /* Centers vertically */
    height: var(--switch-h);
    width: var(--switch-w);
    border-radius: calc(var(--switch-h) / 2);
    background-size: auto 8em;
    background-position: bottom;
    background-image: linear-gradient(to right, rgb(37, 45, 55), rgba(37, 45, 55, 0.5));
    transition: var(--switch-transition-duration);
    overflow: hidden;

    span {
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
  }

  &:checked {
    font-size: var(--switch-font-size);

    & + label {
      /* background-position: top; */
      background-image: linear-gradient(to right, #95c4ff, #117af5);

      span {
        background: #fffad8;
        transform: translateX(var(--switch-off-handle-x)) scale(var(--switch-handle-scale));
        box-shadow:
          0 0 0.25em 0.0625em #fbee8d,
          0 0 2em 0 #ffeb3b,
          inset -0.25em -0.25em 0 0 #fbee8e,
          inset -0.3125em -0.3125em 0 0.625em #fff5b2;
      }
    }
  }
}
</style>
