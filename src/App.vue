<script setup>
import {RouterLink, RouterView} from "vue-router";
import NavbarComponent from "@/components/NavbarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
</script>

<template>
  <header class="bg-gray-400">
    <NavbarComponent></NavbarComponent>
  </header>

  <main class="bg-gray-900 pb-10 min-h-[100vh]">
    <RouterView/>
  </main>

  <footer class="bg-gray-400">
    <FooterComponent></FooterComponent>
  </footer>
</template>

<style>
@import "@/assets/app.css";
</style>
