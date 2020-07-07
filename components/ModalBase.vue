<template>
  <transition appear>
    <div
      class="z-10 max-w-sm h-screen w-screen fixed top-0 flex flex-col items-center justify-center modal-wrap"
    >
      <!-- ここにModalの中身が入る -->
      <slot />

      <!-- Modalを閉じるボタン -->
      <button @click="$emit('closeModal')">
        <i class="material-icons text-white text-5xl">
          clear
        </i>
      </button>
    </div>
  </transition>
</template>

<style scoped>
.v-leave-active,
.v-enter-active {
  transition: opacity 0.4s ease-out;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter-to,
.vleave {
  opacity: 1;
}
</style>
