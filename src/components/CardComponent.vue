<template>
  <div class="card flex bg-gray-700 rounded-lg overflow-hidden columns-2">
    <div class="w-2/5">
      <img class="" :src="character.image" :alt="'Image de ce personnage:' + character.name + '. De cet univers: ' + character.location.name">
    </div>
    <div class="flex flex-col p-5">
      <span class="text-gray-50 text-base md:tex-2xl font-blod mb-2">{{ character.name }}</span>
      <div class="flex items-center mb-2">
        <div class="h-3 w-3 rounded-full mr-3"
             :class="character.status === 'Alive' ? 'bg-green-600' : character.status === 'Dead' ? 'bg-red-600' : 'bg-orange-600'"></div>
        <span class="text-gray-300">{{ character.status }}</span>
      </div>
      <div class="text-gray-500">
        Last known location :
        <p class="text-gray-300 text-sm"
           v-if="character.location.name !== ''">
          {{ character.location.name }}
        </p>
        <p class="text-gray-300"
           v-else>
          Unknown...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardComponent",
  props: {
    character: {
      type: Object,
      require: true
    },
    modalOpen: {
      type: Boolean,
      require: true
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>