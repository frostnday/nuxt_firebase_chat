<template>
  <header class="fixed top-0 bg-lightblue w-full max-w-sm h-16 py-4 z-10">
    <div class="relative flex justify-center w-full">
      <template v-if="isChatPage">
        <nuxt-link
          to="/"
          class="absolute left-20 flex items-center justify-center no-underline"
        >
          <i class="material-icons text-4xl text-white">chevron_left</i>
        </nuxt-link>
      </template>
      <h1 class="text-2xl font-semibold text-white">tech-chat</h1>
    </div>
  </header>
</template>
<script>
export default {
  computed: {
    isChatPage() {
      return this.$route.path.match(/\/rooms\/[A-Za-z0-9]*/)
    }
  }
}
</script>
