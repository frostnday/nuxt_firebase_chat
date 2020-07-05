export default ({ app }, inject) => {
  inject('auth', () => {
    return new Promise(resolve => {
      app.$fireAuth.onAuthStateChanged(auth => {
        resolve(auth || null)
      })
    })
  })
}
