export default {
  route: {
    dashboard: '系统主页',
    profile: '个人中心'
  },
  commonTxt: {
    category: '类目',
    addCategory: '新增类目',
    addContext: '新增常用语',
    context: '常用语',
    underConstruction: '建构中',
    reload: '刷新',
    noSelected: '尚未选择需要使用的常用语',
    noCategorySelected: '尚未选择类目',
  },
  navbar: {
    setting: '系统设置',
    github: '项目地址',
    logOut: '退出登录',
    profile: '个人中心',
    docs: '项目文档',
    theme: '换肤',
    size: '布局大小',
    deleteCache: '清除缓存'
  },
  login: {
    title: 'Live chat',
    logIn: '登录',
    tenant: '企业',
    username: '账号',
    password: '密码',
    code: '验证码',
    rememberMe: '记住我',
  },
  options: {
    greeting: {
      csTipTitle: '客服分配成功提示语',
      csOnlineTip: '客服接入提示语',
      csOfflineTip: '客服离线提示语',
      currentSetting: '当前设置',
    }
  },
  table: {
    platformType: '平台',
    blockList: {
      id: 'ID',
      ip: 'IP',
      remark: '备注',
      requestUri: '请求URI',
      requestMethod: '请求方法',
      limitStart: '限制时间起',
      limitEnd: '限制时间止',
      location: '位置',
      blacklist: '设备黑名单',
      station: '站点',
      ipAddress: 'IP地址',
      addIp: '添加IP',
      addMultiple: '批量添加',
      index: '序号',
      status: '状态',
      operator: '操作人',
      operateTime: '操作时间',
      operate: '操作',
      valid: '启用',
      invalid: '停用',
      edit: '编辑',
      add: '添加',
      delete: '刪除',
      multipleAdd: '批量添加',
      deleteConfirm: '是否更新黑名单限制？',
      disableConfirm: '是否关闭黑名单限制？',
      enableConfirm: '是否开启黑名单限制？',
      createTime: '建立时间',
      endTime: '截止时间',
    },
    rateLimiter: {
      id: 'ID',
      count: '次数',
      requestUri: '请求URI',
      requestMethod: '请求方法',
      limitStart: '限制时间起',
      limitEnd: '限制时间止',
      status: '状态',
      intervalSec: '时间窗口',
    },
    api: {
      user: {
        registerSysUser: {
          success: '注册坐席客服成功',
        },
      }
    },
    user: {
      account: '账号',
      nickname: '昵称',
      name: '姓名',
      password: '密码',
      orgId: '组织',
      stationId: '岗位',
      email: '邮箱',
      sex: '性别',
      status: '状态',
      mobileno: '手机号',
      mobile: '电话',
      avatar: '头像',
      workDescribe: '个人描述',
      passwordErrorLastTime: '最后一次输错密码时间',
      passwordErrorNum: '密码错误次数',
      passwordExpireTime: '密码过期时间',
      lastLoginTime: '最后登录时间',
      nation: '民族',
      education: '学历',
      positionStatus: '职位状态',
      createTime: '创建时间',
      updateTime: '修改时间',
      oldPassword: '旧密码',
      newPassword: '新密码',
      confirmPassword: '确认密码',
      social: '第三方账号'
    },
    role: {
      code: '编码',
      name: '角色名称',
      describe: '角色描述',
      status: '状态',
      readonly: '是否内置',
      createTime: '创建时间',
      dsType: '数据范围',
      orgList: '组织'
    },
    menu: {
      id: 'ID',
      label: '名称',
      describe: '描述',
      code: '权限编码',
      isPublic: '是否公有',
      path: '路由URI',
      type: '类型',
      component: '组件',
      isEnable: '是否启用',
      sortValue: '排序',
      parentId: '上级ID',
      icon: '图标',
      group: '分组'
    },
    resource: {
      code: '编码',
      name: '名称',
      describe: '描述'
    },
    org: {
      label: '部门名称',
      abbreviation: '简称',
      describe: '描述',
      parentId: '上级ID',
      sortValue: '排序',
      status: '状态'
    },
    station: {
      add: '新增',
      id: '站ID',
      name: '站名称',
      createdTime: '站创建时间',
    },
    optLog: {
      requestIp: 'IP',
      type: '类型',
      userName: '操作人',
      description: '操作描述',
      classPath: '类路径',
      actionMethod: '请求方法',
      requestUri: '请求地址',
      httpMethod: '请求类型',
      params: '方法参数',
      result: '返回值',
      exDesc: '异常详情信息',
      consumingTime: '消耗时间',
      startTime: '开始时间',
      finishTime: '完成时间',
      ua: '浏览器请求头'
    },
    loginLog: {
      userName: '姓名',
      account: '账号',
      requestIp: 'IP',
      description: '描述',
      loginDate: '登录时间',
      ua: '浏览器请求头',
      browser: '浏览器',
      browserVersion: '浏览器版本',
      operatingSystem: '操作系统',
      location: '地区'
    },
    attachment: {
      bizId: '业务ID',
      bizType: '业务类型',
      dataType: '数据类型',
      submittedFileName: '文件名',
      group: '组',
      path: '路径',
      relativePath: '相对路径',
      url: '访问链接',
      fileMd5: 'md5',
      contextType: '类型',
      filename: '唯一文件名',
      ext: '后缀',
      size: '大小',
      orgId: '组织',
      icon: '图标'
    },
    smsTemplate: {
      providerType: '类型',
      appId: '应用ID',
      appSecret: '应用密码',
      url: 'SMS服务域名',
      customCode: '模板编码',
      name: '模板名称',
      content: '模板内容',
      templateParams: '模板参数',
      templateCode: '模板CODE',
      signName: '模板签名',
      templateDescribe: '模板描述'
    },
    smsTask: {
      templateId: '短信模板',
      status: '执行状态',
      sourceType: '来源类型',
      receiver: '接收者',
      topic: '主题',
      templateParams: '模板参数',
      sendTime: '发送时间',
      content: '发送内容',
      draft: '是否草稿'
    },
    smsSendStatus: {
      taskId: '任务',
      sendStatus: '发送状态',
      receiver: '接收者手机号',
      bizId: '发送回执',
      ext: '发送返回',
      code: '状态码',
      message: '状态码的描述',
      fee: '计费条数'
    },
    msgs: {
      bizType: '业务类型',
      bizId: '业务ID',
      msgsCenterType: '消息类型',
      title: '标题',
      content: '内容',
      author: '作者',
      handlerUrl: '处理地址',
      handlerParams: '处理参数',
      isSingleHandle: '是否单人处理',
      isDelete: '是否删除',
      isRead: '状态',
      readTime: '读消息的时间'
    },
    systemApi: {
      code: "接口编码",
      name: "接口名称",
      describe: "资源描述",
      requestMethod: "请求方式",
      contentType: "响应类型",
      serviceId: "服务ID",
      path: "请求路径",
      status: "状态",
      isPersist: "保留数据",
      isAuth: "是否需要认证",
      isOpen: "是否公开",
      className: "类名",
      methodName: "方法名"
    },
    application: {
      clientId: "clientId",
      clientSecret: "clientSecret",
      website: "官网",
      name: "应用名称",
      icon: "应用图标",
      appType: "类型",
      describe: "备注",
      status: "状态"
    },
    dictionary: {
      type: "类型",
      name: "名称",
      describe: "描述",
      status: "状态"
    },
    dictionaryItem: {
      dictionaryId: "字典ID",
      dictionaryType: "类型",
      code: "编码",
      name: "名称",
      describe: "描述",
      status: "状态",
      sortValue: "排序"
    },
    area: {
      code: "编码",
      label: "名称",
      fullName: '全名',
      sortValue: '排序',
      longitude: '经度',
      latitude: '维度',
      level: "行政区级",
      parentCode: '父编码',
      parentId: '上级地区',
      source: '数据来源'
    },
    parameter: {
      key: "参数键",
      name: "参数名称",
      value: '参数值',
      describe: '描述',
      status: '状态',
      readonly: '只读'
    },
    status: '状态',
    refresh: '刷新',
    operation: '操作',
    search: '搜索',
    reset: '重置',
    more: '更多',
    add: '添加',
    export: '导出',
    exportPreview: '导出预览',
    import: '导入',
    upload: '上传',
    download: '下载',
    templateDownload: '模板下载',
    delete: '删除',
    resetPassword: '密码重置',
    openInNewPage: '新页面打开',
    createTime: '创建时间',
    updateTime: '修改时间'
  },
  tagsView: {
    refresh: '刷新当前',
    close: '关闭当前',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  settings: {
    title: '系统布局配置',
    theme: '主题色',
    tagsView: '开启 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '侧边栏 Logo'
  },
  sidebar: {
    chat: '对话',
    online: '客服聊天',
    history: '聊天記錄',
    user: '用戶',
    register: '注册坐席客服',
    visitorList: '在线访客列表',
    options: '设置',
    greetingTips: '提示语',
    commonTips: '常用语',
    blacklist: '黑名单',
  },
  history: {
    index: '索引',
    from: '發送者',
    to: '接收者',
    context: '內容',
  },
  visitorList: {
    all: '所有',
    onlineStatus: '在线状态',
    online: '在线',
    offline: '不在线',
    nickname: '访客昵称',
    platform: '平台',
    crVisitorId: '访客用户ID',
    objId: '实体对象ID',
    phoneModel: '设备',
    platformType: '类型',
    lastLoginTime: '最后登录时间',
    onlineTime: '在线时间',
  },
  system: {
    title: 'title'
  },
  tips: {
    systemError: '系统维护中，请稍微再试~',
    usernameShouldNotBeEmpty: '用户名不能为空',
    passwordShouldNotBeEmpty: '密码不能为空',
    switchLanguageSuccess: '切换语言成功',
    loginSuccess: '登录成功',
    loginFail: '登录失败',
    defaultPassword: '用户的默认密码为123456',
    getDataFail: '获取数据失败',
    createSuccess: '新增成功',
    copySelected: '复制成功',
    updateSuccess: '修改成功',
    deleteSuccess: '删除成功',
    noDataSelected: '请先选择需要操作的数据',
    confirmDelete: '选中数据将被永久删除, 是否继续？',
    confirmDeleteCache: '是否立即清除用户权限缓存？',
    containCurrentUser: '包含当前登录用户，操作已取消',
    neverLogin: '从未登录过系统',
    nothing: '这家伙很懒，什么都没留下',
    topId: '值为0时表示顶级节点',
    choose: '已选择：',
    chooseNothing: '尚未选择任何图标',
    onlyChooseOne: '只能选择一个节点作为父节点',
    noNodeSelected: '请先选择节点',
    confirmDeleteNode: '选中节点及其子结点将被永久删除, 是否继续？',
    iframeGrant: '用户名：admin 密码：admin',
    notEqual: '两次输入不一致',
    oldPasswordIncorrect: '原密码不正确',
    uploadSuccess: '上传成功',
    uploadFailed: '上传失败',
    onlySupportXlsx: '只支持Xlsx类型文件',
    onlySupportImage: '上传失败, 只支持图片类型文件',
    updating: '修改中',
    updateFailed: '修改失败',
    noPermission: '无权限',
    confirmRestPassword: '确定重置所选用户密码？',
    resetPasswordSuccess: '所选用户密码重置已被重置为123456',
    getCodeImageFailed: '获取图形验证码失败',
    tooManyRequest: '获取验证码过于频繁，请1分钟后再试',
    clientOriginSecret: '该客户端原始密码为：'
  },
  rules: {
    require: '不能为空',
    range0to255: '长度在 0 到 255 个字符',
    range2to10: '长度在 2 到 10 个字符',
    range3to10: '长度在 3 到 10 个字符',
    range3to20: '长度在 3 到 20 个字符',
    range4to10: '长度在 4 到 10 个字符',
    range6to20: '长度在 6 到 20 个字符',
    email: '请输入正确的邮箱地址',
    mobile: '请输入合法的手机号',
    usernameExist: '该用户名已存在',
    clientIdExist: '该Client ID已存在',
    roleNameExist: '该角色名称已存在',
    noMoreThan10: '长度不能超过10个字符',
    noMoreThan11: '长度不能超过11个字符',
    noMoreThan20: '长度不能超过20个字符',
    noMoreThan50: '长度不能超过50个字符',
    noMoreThan100: '长度不能超过100个字符',
    invalidInteger: '请输入大于零的整数',
    invalidURL: '不是有效的URL',
    numberOnly: '必须是数字'
  },
  common: {
    system: '在线客服聊天系统',
    messageSound: '訊息提示音',
    desc: {
      a: '这里可以放一些文字',
      b: '或是改成图片',
      c: '这是一个登录界面',
      d: '说明文字范例',
      e: '说明文字范例',
      f: '说明文字范例'
    },
    view: '查看',
    tips: '提示',
    clear: '清除',
    confirm: '确定',
    cancel: '取消',
    add: '新增',
    edit: '修改',
    copy: '复制',
    upload: '上传',
    yes: '是',
    no: '否',
    sex: {
      male: '男性',
      female: '女性',
      secret: '保密'
    },
    status: {
      valid: '启用',
      invalid: '禁用'
    },
    menu: {
      menu: '菜单',
      button: '按钮'
    },
    tab: {
      common: '通用类',
      directivity: '指向性',
      solid: '填充类',
      food: '食品类'
    },
    aboutMe: '关于我',
    changeAvatar: '更换头像',
    lastLoginTime: '上次登录时间',
    goodMorning: '早上好',
    goodAfternoon: '下午好',
    goodEvening: '晚上好',
    randomMessage: {
      0: '帮我帮我帮我帮我帮我帮我帮我',
      1: '喝杯咖啡休息下吧☕',
      2: '要不要和朋友打局LOL',
      3: '今天又写了几个Bug🐞呢',
      4: '今天在群里吹水了吗',
      5: '今天吃了什么好吃的呢',
      6: '今天您微笑了吗😊',
      7: '今天帮别人解决问题了吗',
      8: '准备吃些什么呢',
      9: '周末要不要去看电影？'
    },
    docDetails: '了解更多',
    allProject: '所有项目',
    noEmail: '暂无邮箱',
    noMobile: '暂无手机',
    noDept: '暂无部门',
    noRole: '暂无角色',
    noWorkDescribe: '这家伙很懒，什么也没留下~',
    firstLogin: '第一次登录系统',
    todayIp: '今日IP',
    todayVisit: '今日访问',
    TotalVisit: '总访问量',
    you: '您',
    total: '总数',
    visitTitle: '近十天系统访问记录',
    timeline: '登录时间',
    account: '账号信息',
    password: '个人密码',
    importResult: '导入结果',
    hthz: '后田花子',
    al: '阿里系',
    lm: '脸萌',
    ctc: '点击选择',
    pleaseInputUrl: '请输入URL',
    bind: '绑定',
    unbind: '解绑',
    confirmUnbind: '确定解绑该第三方账号？',
    unbindSuccess: '解绑成功',
    bindSuccess: '绑定成功',
    bindLogin: '绑定并登录',
    signLogin: '注册并登录',
    current: '当前',
    socialAccount: '账号',
    socialTips: '尚未绑定任何系统账户，您可以绑定系统账户或者注册一个新的账户并绑定。'
  },
  chat: {
    csOnline: '客服上线中',
    csOffline: '客服已离线',
    imageFile: '(图片)',
    audioFile: '(音源)',
  },
}
