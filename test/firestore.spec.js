import * as fs from 'fs'
import * as firebase from '@firebase/testing'

const testName = 'firestore-test'

describe(testName, () => {
  beforeAll(async () => {
    await firebase.loadFirestoreRules({
      projectId: testName,
      rules: fs.readFileSync('firestore.rules', 'utf8')
    })
  })

  // テスト終了後にデータを削除します
  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: testName })
  })

  // テスト終了後にアプリを削除します
  afterAll(async () => {
    await Promise.all(firebase.apps().map(app => app.delete()))
  })

  // 認証済のFirestore
  function authDB(auth) {
    return firebase
      .initializeTestApp({ projectId: testName, auth: auth })
      .firestore()
  }

  // 未認証のFirestore
  function noAuthDB() {
    return firebase
      .initializeTestApp({ projectId: testName, auth: null })
      .firestore()
  }

  describe('users collection', () => {
    describe('read', () => {
      test('未ログインの場合、ユーザーデータ取得に失敗するかどうか', async () => {
        const db = noAuthDB()
        await firebase.assertFails(
          db
            .collection('users')
            .doc('tech-user')
            .get()
        )
      })

      test('ログイン済の場合、ユーザーデータを取得できるかどうか', async () => {
        const db = authDB({ uid: 'tech-user' })
        await firebase.assertSucceeds(
          db
            .collection('users')
            .doc('tech-user')
            .get()
        )
      })
    })

    describe('create', () => {
      test('自分のアカウントのデータを作成できるかどうか', async () => {
        const db = authDB({ uid: 'tech-user' })
        await firebase.assertSucceeds(
          db
            .collection('users')
            .doc('tech-user')
            .set({
              name: 'testUser',
              iconImageUrl: 'https://exampla.com'
            })
        )
      })

      test('ユーザー名が未入力の場合、作成に失敗するかどうか', async () => {
        const db = authDB({ uid: 'tech-user' })
        await firebase.assertFails(
          db
            .collection('users')
            .doc('tech-user')
            .set({
              name: '',
              iconImageUrl: 'https://exampla.com'
            })
        )
      })

      test('アイコン画像が未入力の場合、作成に失敗するかどうか', async () => {
        const db = authDB({ uid: 'tech-user' })
        await firebase.assertFails(
          db
            .collection('users')
            .doc('tech-user')
            .set({
              name: 'testUser',
              iconImageUrl: ''
            })
        )
      })

      test('他人のアカウントのデータは作成に失敗するかどうか', () => {
        const db = authDB({ uid: 'tech-user' })
        firebase.assertFails(
          db
            .collection('users')
            .doc('tech-user2')
            .set({
              name: 'testUser',
              iconImageUrl: 'https://exampla.com'
            })
        )
      })
    })
  })

  describe('rooms collection', () => {
    describe('read', () => {
      test('未ログインの場合、Roomデータ取得に失敗するかどうか', async () => {
        const db = noAuthDB()
        await firebase.assertFails(
          db
            .collection('rooms')
            .doc('tech-room')
            .get()
        )
      })

      test('ログイン済の場合、Roomデータを取得できるかどうか', async () => {
        const db = authDB({ uid: 'tech-user' })
        await firebase.assertSucceeds(
          db
            .collection('rooms')
            .doc('tech-room')
            .get()
        )
      })
    })

    describe('create', () => {
      test('Roomのデータを作成できるかどうか', async () => {
        const db = authDB({ uid: 'tech-user' })
        await firebase.assertSucceeds(
          db
            .collection('rooms')
            .doc('tech-room')
            .set({
              name: 'なんとかについて話す部屋です',
              topImageUrl: 'https://exampla.com',
              createdAt: new Date()
            })
        )
      })

      test('部屋名が未入力の場合、作成に失敗するかどうか', async () => {
        const db = authDB({ uid: 'tech-user' })
        await firebase.assertFails(
          db
            .collection('rooms')
            .doc('tech-room')
            .set({
              name: '',
              topImageUrl: 'https://exampla.com',
              createdAt: new Date()
            })
        )
      })

      test('TOP画像が未入力の場合、作成に失敗するかどうか', async () => {
        const db = authDB({ uid: 'tech-user' })
        await firebase.assertFails(
          db
            .collection('rooms')
            .doc('tech-room')
            .set({
              name: 'testUser',
              topImageUrl: '',
              createdAt: new Date()
            })
        )
      })

      test('作成日が未入力の場合、作成に失敗するかどうか', async () => {
        const db = authDB({ uid: 'tech-user' })
        await firebase.assertFails(
          db
            .collection('rooms')
            .doc('tech-room')
            .set({
              name: 'testUser',
              topImageUrl: 'https://exampla.com',
              createdAt: ''
            })
        )
      })
    })
  })
})
