<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import ThemeToggle from './components/ThemeToggle.vue'

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
      <ThemeToggle v-model="lightMode" />
    </nav>
    <main>
      <RouterView />
    </main>
  </body>
</template>

<style scoped>
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

.img {
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  -webkit-animation: rotating 20s linear infinite;
  -moz-animation: rotating 20s linear infinite;
  -ms-animation: rotating 20s linear infinite;
  -o-animation: rotating 20s linear infinite;
  animation: rotating 20s linear infinite;
}
</style>
