import db from '@/utils/localstorage'

export default {
  namespaced: true,
  state: {
    station: db.get('STATION', ''),
    msg: 1,
  },
  mutations: {
    setStation (state, val) {
      db.save('STATION', val)
      state.station = val;
    },
    newMsg (state) {
      state.msg += 1;
    },
  }
}
