<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About me</RouterLink>
  </nav>
  <HelloWorld />
</template>

<style scoped>
nav {
  display: flex;
  justify-content: center;
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
</style>
