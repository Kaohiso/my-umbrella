<script setup lang="ts">
import ContributionCalendar from '../components/ContributionCalendar.vue'
import ThreeModel from '@/components/ThreeModel.vue'
</script>

<template>
  <div class="heading">
    <h1>煮えてなんぼのォ!! おでんに候!!! 🍜</h1>
    <ThreeModel />
    <ContributionCalendar />
    <div>
      <h4>👋 Hi there, I'm Kaohiso and welcome to my personal website.</h4>
      <h4>🧑‍💻 I'm a Fullstack developer and looking for a new position.</h4>
      <h4>🍖 I love film, climbing, music and travel.</h4>
      <h4>🏁 My credo is to succeed in everything I undertake.</h4>
    </div>
  </div>
</template>

<style scoped>
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
