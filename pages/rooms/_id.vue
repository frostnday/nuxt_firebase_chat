<template>
  <div class="relative">
    <div class="px-4 pb-32"></div>
    <form
      @submit.prevent="onSubmit"
      class="fixed bottom-0 bg-white w-full max-w-sm flex py-4 border-t border-gray-300"
    >
      <textarea
        v-model="form.message.val"
        placeholder="発言してみよう"
        class="block appearance-none w-full ml-2 py-3 px-4 rounded-lg border border-gray-400 text-darkGray focus:outline-none focus:bg-white overflow-hidden bg-blue-100"
        name="form.body"
      />
      <button
        :disable="isValidateError"
        :class="{ 'text-blue': !isValidateError }"
        class="w-2/12 flex items-start justify-center text-gray font-semibold"
      >
        送信
      </button>
    </form>
  </div>
</template>

<script>
export default {
  middleware: ['checkAuth'],
  data() {
    return {
      form: {
        message: {
          val: null
        }
      }
    }
  },

  computed: {
    isValidateError() {
      return !this.form.message.val
    }
  },

  methods: {
    async onSubmit() {
      if (this.isValidateError) return

      const user = await this.$user()

      // 未ログインの場合
      if (!user) this.$router.push('/login')
      const roomId = this.$route.params.id

      // 登録データを準備
      const chat = {
        userId: user.uid,
        name: user.name,
        iconImageUrl: user.iconImageUrl,
        body: this.form.message.val,
        createdAt: this.$firebase.firestore.FieldValue.serverTimestamp()
      }

      try {
        await this.$firestore
          .collection('rooms')
          .doc(roomId)
          .collection('chats')
          .add(chat)
        this.resetForm()
        this.scrollBottom()
      } catch (e) {
        this.setMessage({ message: '登録に失敗しました。' })
      }
    },

    scrollBottom() {
      const element = document.documentElement
      const bottom = element.scrollHeight - element.clientHeight
      window.scroll(0, bottom)
    },

    resetForm() {
      this.form.message.val = null
    }
  }
}
</script>
