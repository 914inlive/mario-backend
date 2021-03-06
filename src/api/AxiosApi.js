import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import db from '@/utils/localstorage'
import {Base64} from 'js-base64';

axios.interceptors.request.use(config => {
    // const isToken = config.headers['X-isToken'] === false ? config.headers['X-isToken'] : true;
    // const token = db.get('TOKEN', '');
    // if (token && isToken) {
    //   config.headers.token = 'Bearer ' + token;
    // }
    //
    // const clientId = process.env.VUE_APP_CLIENT_ID;
    // const clientSecret = process.env.VUE_APP_CLIENT_SECRET;
    // config.headers['Authorization'] = `Basic ${Base64.encode(`${clientId}:${clientSecret}`)}`;
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 接口返回处理
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

function handleError(error, reject, opts) {
  let isAlert = opts.custom ? opts.custom['isAlert'] : true;
  isAlert = isAlert === undefined ? true : isAlert;
  if (isAlert) {
    if (error.code === 'ECONNABORTED') {
      Message({
        message: '请求超时'
      })
    } else if (error.response && error.response.data) {
      if(error.response.data.msg){
        Message({
          message: error.response.data.msg
        })
      } else if(error.response.data.message){
        Message({
          message: error.response.data.message
        })
      }
    } else if (error.message) {
      Message({
        message: error.message
      })
    }
  }
  reject(error)
}

function handleSuccess(res, resolve, opts) {
  let isAlert = opts.custom ? opts.custom['isAlert'] : true;
  isAlert = isAlert === undefined ? true : isAlert;
  if (res.data.isError) {
    // 未登录
    if (res.data.code === 40000 || res.data.code === 40001
      || res.data.code === 40002 || res.data.code === 40003
      || res.data.code === 40005 || res.data.code === 40006
      || res.data.code === 40008
    ) {
      debugger
      MessageBox.alert(res.data.msg, '提醒', {
        confirmButtonText: '确定',
        callback: () => {
          window.location.hash = '/login'
        }
      })
    } else {
      if (isAlert) {
        Message.error(res.data.msg);
      }
    }
  }
  resolve(res)
}

const httpServer = (opts) => {
  const publicParams = {
    ts: Date.now()
  }

  const method = opts.method.toUpperCase()
  // baseURL
  // 开发环境： /api                 // 开发环境在 vue.config.js 中有 devServer.proxy 代理
  // 生产环境： http://IP:PORT/api   // 生产环境中 代理失效， 故需要配置绝对路径
  const httpDefaultOpts = {
    method,
    baseURL: process.env.VUE_APP_PROD_REQUEST_DOMAIN_PREFIX,
    url: opts.url,
    responseType: opts.responseType || '',
    timeout: 20000
  }
  if (opts['meta']) {
    httpDefaultOpts.headers = opts['meta']
  }

  const dataRequest = ['PUT', 'POST', 'PATCH']
  if (dataRequest.includes(method)) {
    httpDefaultOpts.data = opts.data || {}
  } else {
    httpDefaultOpts.params = {
      ...publicParams,
      ...(opts.data || {})
    }
  }

  // formData转换
  if (opts.formData) {
    httpDefaultOpts.transformRequest = [data => {
      const formData = new FormData()
      if (data) {
        Object.entries(data).forEach(item => {
          formData.append(item[0], item[1])
        })
      }
      return formData
    }]
  }

  const promise = new Promise((resolve, reject) => {
    axios(httpDefaultOpts).then(response => {
      handleSuccess(response, resolve, opts)
    }).catch(error => {
      handleError(error, reject, opts)
    })
  })
  return promise
}

export default httpServer
