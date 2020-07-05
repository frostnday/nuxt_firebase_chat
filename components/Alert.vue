<template>
  <div v-show="message" class="fixed w-full max-w-sm px-3 z-20 top-20">
    <div class="flex bg-red-500 text-white font-bold rounded-t px-4 py-2">
      <label>エラー</label>
      <button class="ml-auto" @click="deleteMessage">
        <i class="material-icons text-white text-1xl">
          clear
        </i>
      </button>
    </div>
    <div
      class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700"
    >
      <p>{{ message }}</p>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters('alert', ['message'])
  },

  methods: {
    ...mapMutations('alert', ['deleteMessage'])
  }
}
</script>
