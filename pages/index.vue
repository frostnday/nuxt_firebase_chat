<template>
  <div>
    <!-- ルーム作成ボタン -->
    <div class="fixed flex justify-end bottom-0 w-full max-w-sm">
      <button @click="openModal">
        <i class="material-icons text-primary text-7xl create-btn gradation">
          add_circle
        </i>
      </button>
    </div>

    <!-- ルーム作成Modal -->
    <ModalBase v-if="isCreateMode" @closeModal="closeModal">
      <CreateRoomModal @closeModal="closeModal" />
    </ModalBase>
  </div>
</template>
<script>
import ModalBase from '~/components/ModalBase'
import CreateRoomModal from '~/components/CreateRoomModal'

export default {
  middleware: ['checkAuth'],
  components: {
    ModalBase,
    CreateRoomModal
  },

  data() {
    return {
      isCreateMode: false
    }
  },

  methods: {
    openModal() {
      this.isCreateMode = true
    },
    closeModal() {
      this.isCreateMode = false
    }
  }
}
</script>
<style scoped>
.create-btn {
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
