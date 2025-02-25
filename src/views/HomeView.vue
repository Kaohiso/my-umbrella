<script setup lang="ts">
import ContributionCalendar from '../components/ContributionCalendar.vue'
</script>

<template>
  <div class="heading">
    <h1>煮えてなんぼのォ!! おでんに候!!! 🍜</h1>
    <img class="img" src="/yamato.jpg" />
    <ContributionCalendar />
    <div>
      <h4>👋 Hi there, I'm Kaohiso and welcome to my personal website.</h4>
      <h4>🧑‍💻 I'm a Fullstack developer and looking for a new position.</h4>
      <h4>🍖 I love One Piece (but you may know), climbing and music.</h4>
      <h4>🏁 My credo is to succeed in everything I undertake.</h4>
    </div>
  </div>
</template>

<style scoped>
.heading {
  text-align: center;
  justify-content: center;
  align-items: center;
}

.img {
  width: 200px;
  height: 200px;
  border-radius: 100%;
  -webkit-animation: rotating 20s linear infinite;
  -moz-animation: rotating 20s linear infinite;
  -ms-animation: rotating 20s linear infinite;
  -o-animation: rotating 20s linear infinite;
  animation: rotating 20s linear infinite;
}
</style>
