<script setup lang="ts">
import ContributionCalendar from '../components/ContributionCalendar.vue'
import ThreeModel from '@/components/ThreeModel.vue'
</script>

<template>
  <div class="heading">
    <div class="title">
      <h1>煮えてなんぼのォ!! おでんに候!!! 🍜</h1>
      <div class="underline"></div>
    </div>
    <ThreeModel />
    <ContributionCalendar />
    <div>
      <h3>👋 Hi there, I'm Kaohiso and welcome to my personal website.</h3>
      <h3>🧑‍💻 I'm a Fullstack developer and looking for a new position.</h3>
      <h3>🍖 I love film, climbing, music and travel.</h3>
      <h3>🏁 My credo is to succeed in everything I undertake.</h3>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: bold;
  font-size: 29px;
}

.title {
  position: relative;
  z-index: 1;
}

.underline {
  position: absolute;
  z-index: -1;
  top: 75%;
  width: 100%;
  border: 7px solid var(--vt-c-royalblue-mute);
  border-radius: 3px;
}

.heading {
  display: flex;
  height: 100%;
  flex-direction: column;
  text-align: center;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
  padding-bottom: 3rem;
}
</style>
