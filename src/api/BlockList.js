import axiosApi from './AxiosApi.js'

const apiList = {

  getIPBlacklist: {
    url: `/tenantManage/blacklist/ip/query`,
    method: 'POST'
  },
  getDeviceBlacklist: {
    url: `/tenantManage/blacklist/device/query`,
    method: 'POST'
  },
  addBlackIP: {
    url: `/tenantManage/blacklist/ip/add`,
    method: 'POST'
  },
  addBlackDeviceId: {
    url: `/tenantManage/blacklist/device/add`,
    method: 'POST'
  },
  delBlackIP: {
    url: `/tenantManage/blacklist/ip/delete`,
    method: 'POST'
  },
  delBlackDeviceId: {
    url: `/tenantManage/blacklist/device/delete`,
    method: 'POST'
  },
  editBlackIP: {
    url: `/tenantManage/blacklist/ip/update`,
    method: 'POST'
  },
  editBlackDeviceId: {
    url: `/tenantManage/blacklist/device/update`,
    method: 'POST'
  }
}

export default {
  getIPBlacklist (data) {
    return axiosApi({
      ...apiList.getIPBlacklist,
      data
    })
  },
  getDeviceBlacklist (data) {
    return axiosApi({
      ...apiList.getDeviceBlacklist,
      data
    })
  },
  addBlackIP (data) {
    return axiosApi({
      ...apiList.addBlackIP,
      data
    })
  },
  addBlackDeviceId (data) {
    return axiosApi({
      ...apiList.addBlackDeviceId,
      data
    })
  },
  delBlackIP (data) {
    return axiosApi({
      ...apiList.delBlackIP,
      data
    })
  },
  delBlackDeviceId (data) {
    return axiosApi({
      ...apiList.delBlackDeviceId,
      data
    })
  },
  editBlackIP (data) {
    return axiosApi({
      ...apiList.editBlackIP,
      data
    })
  },
  editBlackDeviceId (data) {
    return axiosApi({
      ...apiList.editBlackDeviceId,
      data
    })
  },
}
