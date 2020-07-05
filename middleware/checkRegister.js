export default async function({ redirect, app }) {
  if (await app.$user()) {
    // すでにアカウント作成済の場合はTOPページにリダイレクト
    redirect('/')
  }
}
