export const state = () => ({
  rooms: []
})

export const getters = {
  rooms: state => state.rooms
}

export const mutations = {
  add(state, { room }) {
    const isNotAdded = !state.rooms.find(r => r.id === room.id)

    if (isNotAdded) {
      state.rooms.push(room)
    }
  },

  update(state, { room }) {
    state.rooms = state.rooms.map(r => {
      if (r.id === room.id) {
        r = room
      }
      return r
    })
  },

  remove(state, { room }) {
    state.rooms = state.rooms.filter(r => r.id !== room.id)
  },

  clear(state) {
    state.rooms = []
  }
}

export const actions = {
  subscribe({ commit }) {
    return this.$firestore
      .collection('rooms')
      .orderBy('createdAt', 'asc')
      .onSnapshot(roomsSnapShot => {
        roomsSnapShot.docChanges().forEach(snapshot => {
          const room = {
            id: snapshot.doc.id,
            ...snapshot.doc.data()
          }

          switch (snapshot.type) {
            case 'added':
              commit('add', { room })
              break

            case 'modified':
              commit('update', { room })
              break

            case 'removed':
              commit('remove', { room })
              break
          }
        })
      })
  },

  clear({ commit }) {
    commit('clear')
  }
}
