<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import ThemeToggle from './components/ThemeToggle.vue'
import GitHub from '/svg/github.svg'
import LinkedIn from '/svg/linkedin.svg'

const lightMode = ref(JSON.parse(localStorage.getItem('lightMode') || 'false'))

watch(lightMode, (newValue) => {
  localStorage.setItem('lightMode', JSON.stringify(newValue))
})
</script>

<template>
  <div class="container" :class="{ 'theme-light': lightMode }">
    <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About me</RouterLink>
        <ThemeToggle v-model="lightMode" />
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <footer :class="{ 'theme-light-footer': lightMode }">
      <section>
        <a href="https://github.com/Kaohiso">
          <img src="/svg/github.svg" alt="github account" width="30" height="30" />
        </a>
        <a href="https://www.linkedin.com/in/antoine-bentini-17b7a3197/">
          <img src="/svg/linkedin.svg" alt="github account" width="30" height="30" />
        </a>
      </section>
      <h5>kaohiso © 2025</h5>
    </footer>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

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

footer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;

  section {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
}
</style>
