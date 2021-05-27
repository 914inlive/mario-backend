import axiosApi from './AxiosApi.js'

const apiList = {
  captcha: `/oauth/anno/captcha`,
  login: `/oauth/anno/token`,
  router: `/oauth/menu/router`,
  resource: `/oauth/resource/visible`,
}

export default {
  getCaptcha (randomId) {
    return new Promise(resolve => {
      const res = {"code":0,"data":{"token":"eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoi6LaF57qn566h55CG5ZGYIiwidG9rZW5fdHlwZSI6InRva2VuIiwidXNlcmlkIjoiMyIsImFjY291bnQiOiJ6dWlob3UiLCJleHAiOjE1OTkxNDgwOTUsIm5iZiI6MTU5OTExOTI5NX0.sp_dT8E9CgDdXw7Y79skKzHLWWr_lkm7GtcbaBX2s0U","tokenType":"token","refreshToken":"eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaF90b2tlbiIsInVzZXJpZCI6IjMiLCJleHAiOjE1OTkyMDU2OTUsIm5iZiI6MTU5OTExOTI5NX0.JM9OCHc2CIz7VZWonuUjn_ff89TjDec6qQoj039HfGs","name":"超级管理员","account":"admin","avatar":"default.jpg","workDescribe":"Hi~","userId":"3","expire":28800,"expiration":"2020-09-03 23:48:15"},"msg":"ok","path":null,"extra":null,"timestamp":1599119295324,"isError":false,"isSuccess":true}
      resolve({data: res});
    });

  //   return axiosApi({
  //     method: 'GET',
  //     url: apiList.captcha + `?key=${randomId}`,
  //     responseType: 'arraybuffer',
  //     meta: {
  //       "X-isToken": false
  //     }
  //   })
  },
  login (data) {
    return new Promise(resolve => {
      const res = {"code":0,"data":{"token":"eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoi6LaF57qn566h55CG5ZGYIiwidG9rZW5fdHlwZSI6InRva2VuIiwidXNlcmlkIjoiMyIsImFjY291bnQiOiJ6dWlob3UiLCJleHAiOjE1OTkxNDgwOTUsIm5iZiI6MTU5OTExOTI5NX0.sp_dT8E9CgDdXw7Y79skKzHLWWr_lkm7GtcbaBX2s0U","tokenType":"token","refreshToken":"eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaF90b2tlbiIsInVzZXJpZCI6IjMiLCJleHAiOjE1OTkyMDU2OTUsIm5iZiI6MTU5OTExOTI5NX0.JM9OCHc2CIz7VZWonuUjn_ff89TjDec6qQoj039HfGs","name":"超级管理员","account":"admin","avatar":"default.jpg","workDescribe":"Hi~","userId":"3","expire":28800,"expiration":"2020-09-03 23:48:15"},"msg":"ok","path":null,"extra":null,"timestamp":1599119295324,"isError":false,"isSuccess":true}
      resolve({data: res});
    });
    //   method: 'POST',
    //   url: apiList.login,
    //   data
    // })
  },
  getRouter (data) {
    return new Promise(resolve => {
      const res =
        {
          "code": 0,
          "data": [
            {
              "sortValue": 1,
              "children": [
                {
                  "sortValue": 0,
                  "path": "/chat/communicate",
                  "name": "客服聊天",
                  "component": "chat/communicate/Index",
                  "meta": {
                    "title": "客服聊天",
                    "icon": "",
                    "breadcrumb": true
                  },
                  "hidden": false,
                  "alwaysShow": false
                },
                {
                  "sortValue": 1,
                  "path": "/chat/history",
                  "name": "聊天记录",
                  "component": "chat/history/Index",
                  "meta": {
                    "title": "聊天记录",
                    "icon": "",
                    "breadcrumb": true
                  },
                  "hidden": false,
                  "alwaysShow": false
                },
              ],
              "path": "/chat",
              "name": "对话",
              // "component": "options/common/Index",
              "component": "Layout",
              "meta": {
                "title": "对话",
                "icon": "el-icon-chat-line-round",
                "breadcrumb": true
              },
              "hidden": true,
              "alwaysShow": true
            },
            {
              "sortValue": 4,
              "children": [
                {
                  "sortValue": 0,
                  "path": "/user/registerSysUser",
                  "name": "注册坐席客服",
                  "component": "user/registerSysUser/Index",
                  "meta": {
                    "title": "注册坐席客服",
                    "icon": "",
                    "breadcrumb": true
                  },
                  "hidden": false,
                  "alwaysShow": false
                },
                {
                  "sortValue": 1,
                  "path": "/visitor/online",
                  "name": "在线访客列表",
                  "component": "visitor/online/Index",
                  "meta": {
                    "title": "在线访客列表",
                    "icon": "",
                    "breadcrumb": true
                  },
                  "hidden": false,
                  "alwaysShow": false
                },
              ],
              "path": "/user",
              "name": "用户",
              "component": "Layout",
              "meta": {
                "title": "用户",
                "icon": "el-icon-s-custom",
                "breadcrumb": true
              },
              "hidden": true,
              "alwaysShow": true
            },
            {
              "sortValue": 6,
              "children": [
                {
                  "sortValue": 0,
                  "path": "/options/greeting",
                  "name": "提示语",
                  "component": "options/greeting/Index",
                  "meta": {
                    "title": "提示语",
                    "icon": "",
                    "breadcrumb": true
                  },
                  "hidden": false,
                  "alwaysShow": false
                },
                {
                  "sortValue": 1,
                  "path": "/options/common",
                  "name": "常用语",
                  "component": "options/common/Index",
                  "meta": {
                    "title": "常用语",
                    "icon": "",
                    "breadcrumb": true
                  },
                  "hidden": false,
                  "alwaysShow": false
                },
                {
                  "sortValue": 2,
                  "path": "/options/blacklist",
                  "name": "黑名单",
                  "component": "options/blacklist/Index",
                  "meta": {
                    "title": "黑名单",
                    "icon": "",
                    "breadcrumb": true
                  },
                  "hidden": false,
                  "alwaysShow": false
                },
              ],
              "path": "/options",
              "name": "设置",
              "component": "Layout",
              "meta": {
                "title": "设置",
                "icon": "el-icon-s-tools",
                "breadcrumb": true
              },
              "hidden": true,
              "alwaysShow": true
            },
            {
              "sortValue": 8,
              "children": [
                {
                  "sortValue": 0,
                  "path": "/stations",
                  "name": "站点",
                  "component": "stations/Index",
                  "meta": {
                    "title": "站点",
                    "icon": "",
                    "breadcrumb": true
                  },
                  "hidden": true,
                  "alwaysShow": false
                },
              ],
              "path": "/stations",
              "name": "站点列表",
              "component": "Layout",
              "meta": {
                "title": "站点列表",
                "icon": "el-icon-share",
                "breadcrumb": true
              },
              "hidden": true,
              "alwaysShow": true
            }

          ],
          "extra": null,
          "isError": false,
          "isSuccess": true,
          "msg": "ok",
          "path": null,
          "timestamp": 1599122327884
        }
      resolve({data: res});
    });

    // return axiosApi({
    //   method: 'GET',
    //   url: apiList.router,
    //   data: data || {}
    // })
  },
  getResource (data) {
    return new Promise(resolve => {
      const res = {"code":0,"data":["org:add","role:config","resource:add","resource:update","resource:delete","resource:view","org:update","org:delete","org:view","org:import","org:export","station:add","station:update","station:delete","station:view","station:export","station:import","user:add","user:update","user:delete","user:view","user:import","user:export","menu:add","menu:update","menu:delete","menu:view","menu:export","menu:import","role:add","role:update","role:delete","role:view","role:export","role:import","role:auth","dict:add","dict:update","dict:view","dict:delete","dict:export","dict:import","area:add","area:update","area:delete","area:view","area:export","area:import","optLog:view","optLog:export","msgs:view","msgs:delete","msgs:update","msgs:export","sms:template:add","sms:template:update","sms:template:view","sms:template:delete","sms:template:import","sms:template:export","sms:manage:add","sms:manage:update","sms:manage:view","sms:manage:delete","sms:manage:export","sms:manage:import","file:add","file:update","file:delete","file:view","file:download","optLog:delete","loginLog:delete","loginLog:export","msgs:add","msgs:mark","application:add","application:update","application:delete","application:view","application:export","parameter:add","parameter:update","parameter:delete","parameter:export","product:add","product:update","product:copy","product:delete","product:export","parameter:import","msgs:import","parameter:view","loginLog:view"],"msg":"ok","path":null,"extra":null,"timestamp":1599119295923,"isError":false,"isSuccess":true}
      resolve({data: res});
    });

    // return axiosApi({
    //   method: 'GET',
    //   url: apiList.resource,
    //   data: data || {}
    // })
  }
}
