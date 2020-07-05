<template>
  <div class="m-4 p-4 bg-white shadow rounded">
    <h2 class="text-2xl text-center text-darkGray">アカウント登録</h2>
    <form>
      <div class="flex items-center justify-center flex-col w-full h-full mt-8">
        <div
          class="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full border border-gray-400 "
        >
          <i class="material-icons text-7xl text-gray">
            person
          </i>
          <input
            ref="image"
            type="file"
            style="display: none"
            accept="image/*"
          />
        </div>
      </div>
      <label
        class="block mt-8 mb-2 ml-2 uppercase tracking-wide text-darkGray text-s"
      >
        名前
      </label>
      <div class="h-20 mb-6">
        <input
          type="text"
          class="block w-full py-3 px-4 appearance-none bg-gray-200 text-darkGray border rounded leading-tight focus:outline-none focus:bg-white"
        />
      </div>

      <div class="flex">
        <button
          class="w-full p-3 gradation rounded-full text-white
        "
        >
          登録
        </button>
      </div>
    </form>
  </div>
</template>
