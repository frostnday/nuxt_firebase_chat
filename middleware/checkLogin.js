export default async function({ redirect, app }) {
  if (await app.$auth()) {
    // ログイン中だったらTOPページに遷移する
    redirect('/')
  }
}
