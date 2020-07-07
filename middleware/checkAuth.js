export default async function({ redirect, app }) {
  const user = await app.$user()
  if (!user) {
    redirect('/register')
  }
}
