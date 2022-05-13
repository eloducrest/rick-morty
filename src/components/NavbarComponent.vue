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
import axios from "axios";

export default {
  name: "NavbarComponent",
  data() {
    return {
      inputSearch: "",
      timer: null,
    }
  },
  methods: {
    searchCharacters() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        axios.get("https://rickandmortyapi.com/api/character/?gender=female&species=human&name=" + this.inputSearch)
          .then(({data}) => {
            this.$emit("searchInput", data);
          })
          .catch(() => {
            window.alert("Une erreur est survenue... Merci d'essayer à nouveau");
          })
      });
    },
  },
}
</script>
