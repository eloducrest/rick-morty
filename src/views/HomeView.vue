<template>
  <section class="container mx-auto">
    <div class="container bg-gray-900 flex justify-center items-center sticky top-0 px-4 mb-4 sm:px-6 lg:px-8 flex-col :flex-col md:flex-row md:py-4">
      <div class="my-5 md:m-0 w-full">
        <input type="text" class="h-8 w-96 pr-8 pl-5 bg-transparent border border-slate-300 rounded-full text-xs z-0 focus:shadow text-white focus:outline-none"
               placeholder="Search character by name..."
               v-model="filters.name"
               @keyup="getAllCharacters">
      </div>
      <div class="mb-5 md:m-0 w-full">
        <select class="h-8 sm:ml-3 bg-transparent border border-slate-300 rounded-full text-xs text-white pl-3"
                v-model="filters.gender"
                @change="getAllCharacters">
          <option :value="''" class="text-black">All gender</option>
          <option :value="'female'" class="text-black">Female</option>
          <option :value="'male'" class="text-black">Male</option>
          <option :value="'genderless'" class="text-black">Genderless</option>
          <option :value="'unknown'" class="text-black">Unknown</option>
        </select>
      </div>
      <div class="mb-5 md:m-0 w-full">
        <select class="h-8 sm:ml-3 bg-transparent border border-slate-300 rounded-full text-xs text-white pl-3"
                v-model="filters.status"
                @change="getAllCharacters">
          <option :value="''" class="text-black">All status</option>
          <option :value="'alive'" class="text-black">Alive</option>
          <option :value="'dead'" class="text-black">Dead</option>
          <option :value="'unknown'" class="text-black">Unknown</option>
        </select>
      </div>
      <div class="md:m-0 w-full">
        <select class="h-8 sm:ml-3 bg-transparent border border-slate-300 rounded-full text-xs text-white pl-3"
                v-model="filters.species"
                @change="getAllCharacters">
          <option :value="''" class="text-black">All species</option>
          <option :value="'alien'" class="text-black">Alien</option>
          <option :value="'animal'" class="text-black">Animal</option>
          <option :value="'cronenberg'" class="text-black">Cronenberg</option>
          <option :value="'disease'" class="text-black">Disease</option>
          <option :value="'human'" class="text-black">Human</option>
          <option :value="'humanoid'" class="text-black">Humanoid</option>
          <option :value="'mythological'" class="text-black">Mythological Creature</option>
          <option :value="'poopybutthole'" class="text-black">Poopybutthole</option>
          <option :value="'robot'" class="text-black">Robot</option>
          <option :value="'unknown'" class="text-black">Unknown</option>
        </select>
      </div>
    </div>
    <div class="grid lg:grid-cols-3	md:grid-cols-2 sm:grid-cols-1 gap-4" v-if="haveNoResult === false">
      <CardComponent class="cursor-pointer"
                     v-for="character in allCharacters" :key="character.id"
                     :character="character"
                     @click="getEpisodesByCharacter(character)"></CardComponent>
    </div>
    <div class="flex justify-center text-white font-bold text-xl pt-10" v-else>Aucun résultat trouvé...</div>

    <ModalComponent v-if="isOpenModal" @closeModal="closeModal">
        <template v-slot:header>
        <span class="text-2xl font-bold underline">Les épisodes de : {{ detailsCharacter.name }} <span class="text-lg">({{
            episodesByCharacter.length + ' apparition' + (episodesByCharacter.length > 1 ? 's' : '')
          }})</span></span>
        </template>
        <template v-slot:body>
          <div class="grid md:grid-cols-3 sm:grid-cols-1 mt-10">
            <div class="sm:mr-20 sm:ml-20 mr-20 h-96 overflow-y-scroll">
              <div v-for="(episode, index) in episodesByCharacter" :key="index">
                <div class=" mb-5 p-5 shadow-lg hover:shadow-gray-500/50 rounded-lg cursor-pointer"
                     :class="episode.id === selectedEpisode ? 'bg-gray-500' : 'bg-gray-700'"
                     @click="getAllCharactersByEpisodes(episode)">
                  <p>{{ episode.name }}</p>
                  <p>{{ episode.episode }}</p>
                  <p>{{ episode.air_date }}</p>
                </div>
              </div>
            </div>
            <div
              class="col-span-2 grow sm:mt-10 md:mt-0 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 overflow-y-scroll h-96">
              <div class="flex flex-col items-center"
                   v-for="character in allCharactersByEpisode" :key="character.id">
                <div class="h-16 w-16 rounded-full overflow-hidden">
                  <img :src="character.image" :alt="'Image de: ' + character.name">
                </div>
                <span class="text-base">{{ character.name }}</span>
              </div>
            </div>
          </div>
        </template>
      </ModalComponent>
    <PaginationComponent v-if="pagination.pages > 1"
                         :pagination="pagination"
                         @pageChange="pageChange"></PaginationComponent>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",
  data() {
    return {
      // datas
      allCharacters: {},
      detailsCharacter: {},
      allCharactersByEpisode: [],
      // filters
      filters: {
        name: "",
        status: "",
        gender: "female",
        species: "human",
      },
      haveNoResult: false,
      // modal
      isOpenModal: false,
      episodesByCharacter: {},
      // style
      selectedEpisode: null,
      // pagination
      pagination: {},
    }
  },
  methods: {
    // FETCH DATA
    getAllCharacters() {
      axios.get("https://rickandmortyapi.com/api/character/?name="+this.filters.name+"&status="+this.filters.status+"&species="+this.filters.species+"&gender="+this.filters.gender)
        .then(({data}) => {
          console.log('dadadada', data);
          this.allCharacters = data.results;
          this.pagination = data.info;
          this.pagination.currentPage = 1;
          this.haveNoResult = false
        })
        .catch(() => {
          this.haveNoResult = true
        });
    },
    getEpisodesByCharacter(character) {
      document.querySelector('body').style.overflow = "hidden";
      this.isOpenModal = true;
      this.detailsCharacter = character;
      let episodesId = this.getItemsIdByURL(character.episode);

      axios.get("https://rickandmortyapi.com/api/episode/[" + episodesId + "]")
        .then(({data}) => {
          this.episodesByCharacter = data;
          this.getAllCharactersByEpisodes(data[0])
        })
        .catch(() => {
          window.alert("Une erreur est survenue... Merci d'essayer à nouveau")
        })
    },
    getItemsIdByURL(collection) {
      let itemsId = [];
      for (let i = 0; i < collection.length; i++) {
        let urlSplit = collection[i].split('/');
        itemsId.push(urlSplit[urlSplit.length - 1]);
      }
      return itemsId;
    },
    getAllCharactersByEpisodes(episode) {
      this.selectedEpisode = episode.id;
      let charactersId = this.getItemsIdByURL(episode.characters);
      axios.get("https://rickandmortyapi.com/api/character/" + charactersId)
        .then(({data}) => {
          this.allCharactersByEpisode = data;
        })
        .catch(() => {
          window.alert("Une erreur est survenue... Merci d'essayer à nouveau")
        })
    },
    // MODAL
    closeModal() {
      document.querySelector('body').style.overflow = "scroll";
      this.detailsCharacter = {};
      this.episodesByCharacter = {};
      this.allCharactersByEpisode = {};
      this.isOpenModal = false;
    },
    // PAGINATION
    pageChange(value) {
      axios.get("https://rickandmortyapi.com/api/character/?name="+this.filters.name+"&status="+this.filters.status+"&gender="+this.filters.gender+"&species="+this.filters.species+"&page="+value)
        .then(({data}) => {
          this.allCharacters = data.results;
          this.pagination = data.info;
          this.pagination.currentPage = 1;
          this.$emit('reloadDataPageChange', data.results);
        })
        .catch(() => {
          window.alert("Une erreur est survenue... Merci d'essayer à nouveau");
        })
    }
  },
  created() {
    this.getAllCharacters()
  },
  mounted() {
    document.body.addEventListener('keydown', e => {
      if (e.keyCode === 27) {
        this.closeModal();
      }
    })
  }
}
</script>
