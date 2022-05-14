<template>
  <div class="flex items-start justify-center	fixed inset-0 bg-gray-900/75 pt-12"
       @click.stop.prevent="closeModal">
    <div class="bg-gray-800 text-white shadow-lg shadow-gray-800 min-h-200 w-[85%] max-h-[85%] overflow-y-auto md:overflow-y-hidden rounded-lg relative p-8"
         @click.stop>
      <div class="flex justify-between">
        <slot name="header"></slot>
        <span class="cursor-pointer text-2xl font-bold"
              @click="closeModal">X</span>
      </div>
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalComponent",
  methods: {
    closeModal() {
      this.$emit('closeModal', false);
    }
  }
}
</script>

