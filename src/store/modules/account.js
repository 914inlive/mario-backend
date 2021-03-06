import db from '@/utils/localstorage'

export default {
  namespaced: true,
  state: {
    refreshToken: db.get('REFRESH_TOKEN'),
    token: db.get('TOKEN', ''),
    tenant: db.get('TENANT', ''),
    expireTime: db.get('EXPIRE_TIME', 0),
    user: db.get('USER'),
    permissions: db.get('PERMISSIONS') || [],
    routes: db.get('USER_ROUTER') || [],
    login: db.get('LOGIN', {id: '', pass: '', remember: false}),
    tmproutes: db.get('USER_TMP_ROUTER') || [],
  },
  mutations: {
    setLogin (state, val) {
      db.save('LOGIN', val)
      state.login = val
    },
    setTenant (state, val) {
      db.save('TENANT', val)
      state.accessToken = val
    },
    setRefreshToken (state, val) {
      db.save('REFRESH_TOKEN', val)
      state.refreshToken = val
    },
    setToken (state, val) {
      db.save('TOKEN', val)
      state.token = val
    },
    setExpireTime (state, val) {
      db.save('EXPIRE_TIME', val)
      state.expireTime = val
    },
    setUser (state, val) {
      db.save('USER', val)
      state.user = val
    },
    setPermissions (state, val) {
      db.save('PERMISSIONS', val)
      state.permissions = val
    },
    setRoutes (state, val) {
      db.save('USER_ROUTER', val)
      state.routes = val
    },
    setTmpRoutes (state, val) {
      db.save('USER_TMP_ROUTER', val)
      state.tmproutes = val
    }
  }
}
