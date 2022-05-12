<template>
  <nav class="container flex items-center py-3 mx-auto">
    <div>
      <router-link to="home" class="flex items-center">
        <img class="w-14 h-14 mr-4" src="@/assets/logo.svg"/>
        <span class="text-xl font-medium text-white">Rick & Morty</span>
      </router-link>
    </div>
    <div class="space-x-8 ml-auto">
      <router-link to="/">Accueil</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent"
}
</script>
