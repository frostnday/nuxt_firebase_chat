<template>
  <div class="bg-white shadow rounded-lg m-4 w-11/12 p-4">
    <form @submit.prevent="onSubmit">
      <div class="flex justify-center items-center flex-col mt-3">
        <div
          :class="{ 'border border-red-500': form.imageUrl.errorMessage }"
          class="rounded-lg w-32 h-32 bg-gray-200 flex items-center justify-center"
        >
          <template v-if="form.imageUrl.val">
            <img
              :src="form.imageUrl.val"
              @click="selectImage"
              class="w-32 h-32 object-cover border rounded-lg"
            />
          </template>
          <template v-else>
            <i @click="selectImage" class="material-icons text-6xl text-gray">
              add_photo_alternate
            </i>
          </template>
          <input
            ref="image"
            @change="onFileSelect"
            type="file"
            style="display: none"
            accept="image/*"
          />
        </div>
        <span
          v-show="form.imageUrl.errorMessage"
          class="text-red text-sm text-center"
        >
          {{ form.imageUrl.errorMessage }}
        </span>
      </div>
      <div class="h-20 mb-4 mt-10">
        <textarea
          v-model="form.name.val"
          @blur="validateName"
          :class="{ 'border-red-500': form.name.errorMessage }"
          placeholder="部屋の名前を入力しよう！"
          class="appearance-none block w-full bg-gray-200 text-darkGray border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          maxlength="mexLength"
        />
        <span v-show="form.name.errorMessage" class="text-red text-sm">
          {{ form.name.errorMessage }}
        </span>
      </div>

      <div class="flex">
        <button
          class="gradation rounded-full p-3 text-white w-full
        "
        >
          作成
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      form: {
        name: {
          label: '名前',
          val: null,
          errorMessage: null
        },
        imageUrl: {
          label: '画像',
          val: null,
          errorMessage: null
        }
      }
    }
  },

  computed: {
    isValidateError() {
      return this.form.name.errorMessage || this.form.imageUrl.errorMessage
    },

    maxLength() {
      return 35
    }
  },

  methods: {
    ...mapMutations('alert', ['setMessage']),

    selectImage() {
      this.$refs.image.click()
    },

    onFileSelect(e) {
      const files = e.target.files
      if (files.length === 0) return

      const reader = new FileReader()
      reader.readAsDataURL(files[0])

      reader.addEventListener('load', () => {
        this.upload({
          localImageFile: files[0]
        })
      })
    },

    // 画像アップロード処理
    async upload({ localImageFile }) {
      const user = await this.$auth()

      // 未ログインの場合
      if (!user) this.$router.push('/login')

      // ストレージオブジェクト作成
      const storageRef = this.$fireStorage.ref()

      // ファイルのパスを設定
      const imageRef = storageRef.child(
        `images/${user.uid}/rooms/${localImageFile.name}`
      )

      // ファイルを適用してファイルアップロード開始
      const snapShot = await imageRef.put(localImageFile)
      this.form.imageUrl.val = await snapShot.ref.getDownloadURL()

      this.validateImageUrl()
    },

    validateName() {
      const { name } = this.form

      if (!name.val) {
        name.errorMessage = `${name.label}は必須入力項目です`
        return
      }

      if (name.val.length > this.maxLength) {
        name.errorMessage = `${name.label}は${this.maxLength}文字以内です。`
        return
      }

      name.errorMessage = null
    },

    validateImageUrl() {
      const { imageUrl } = this.form

      if (!imageUrl.val) {
        imageUrl.errorMessage = `${imageUrl.label}は必須入力項目です`
        return
      }

      imageUrl.errorMessage = null
    },

    async onSubmit() {
      // 認証チェック
      const user = this.$auth.currentUser
      if (!user) this.$router.push('/login')

      // 入力値チェック
      this.validateName()
      this.validateImageUrl()
      if (this.isValidateError) return

      // 登録データを準備
      const params = {
        name: this.form.name.val,
        topImageUrl: this.form.imageUrl.val,
        createdAt: this.$firebase.firestore.FieldValue.serverTimestamp()
      }

      try {
        await this.$firestore.collection('rooms').add(params)
        this.$emit('closeModal')
      } catch (e) {
        this.setMessage({ message: '登録に失敗しました。' })
      }
    }
  }
}
</script>
