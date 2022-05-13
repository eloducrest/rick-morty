<template>
  <div class="container mt-4 pb-4">
    <ul class="flex gap-10 justify-center text-white">
      <li class="cursor-pointer" v-if="pagination.prev !== null"
          @click="upOrDown(-1)">&lsaquo;
      </li>

      <li class="cursor-pointer"
          :class="n === currentPage ? 'text-red-600' : ''"
          v-for="(n, index) in pagination.pages" :key="index"
          @click="setNumberPage(n)">{{ n }}
      </li>

      <li class="cursor-pointer" v-if="pagination.next !== null"
          @click="upOrDown(1)">&rsaquo;
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PaginationComponent",
  props: {
    pagination: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      currentPage: 1,
    }
  },
  methods: {
    upOrDown(value) {
      this.currentPage += value
      this.$emit('pageChange', this.currentPage);
    },
    setNumberPage(page) {
      if (page !== this.pagination.currentPage) {
        this.currentPage = page;
        this.$emit('pageChange', this.currentPage)
      }
    }
  },
  created() {
  }
}
</script>
