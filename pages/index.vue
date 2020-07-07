<template>
  <div>
    <div>
      <div
        v-for="room in rooms"
        :key="room.id"
        class="bg-white max-w-sm rounded-lg overflow-hidden shadow m-4 mb-5 p-4 h-32"
      >
        <div>
          <img
            :src="room.topImageUrl"
            class="float-left object-cover rounded-lg w-24 h-24 mr-4"
          />
          <p class="font-mono text-darkGray">{{ room.name }}</p>
        </div>
      </div>
    </div>
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
import { mapGetters } from 'vuex'
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
      isCreateMode: false,
      unsubscribe: null
    }
  },

  computed: {
    ...mapGetters('rooms', ['rooms'])
  },

  async asyncData({ store }) {
    const unsubscribe = await store.dispatch('rooms/subscribe')
    return {
      unsubscribe
    }
  },

  destroyed() {
    this.$store.dispatch('rooms/clear')
    if (this.unsubscribe) this.unsubscribe()
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
