/**
 * 判断终端以及浏览器
 * userAgent string User-Agent信息
 */
export const readUserAgent = ua => {
  let data = {
    terminal: '',
    browser: '',
    terminalType: {}
  }
  data.terminalType = {
    trident: ua.indexOf('Trident') > -1, // IE内核
    presto: ua.indexOf('Presto') > -1, // opera内核
    webKit: ua.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1, // 火狐内核
    mobile: !!ua.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1, // android终端
    iPhone: ua.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: ua.indexOf('iPad') > -1, // 是否iPad
    webApp: ua.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
    weixin: ua.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
    qq: ua.match(/\sQQ/i) === ' qq' // 是否QQ
  }
  if (
    data.terminalType.ios ||
    data.terminalType.iPhone ||
    data.terminalType.iPad
  ) {
    data.terminal = '苹果'
  } else if (data.terminalType.android) {
    data.terminal = '安卓'
  } else {
    data.terminal = 'PC'
  }
  if (/msie/i.test(ua) && !/opera/.test(ua)) {
    data.browser = 'IE'
  } else if (/firefox/i.test(ua)) {
    data.browser = 'Firefox'
  } else if (/chrome/i.test(ua) && /webkit/i.test(ua) && /mozilla/i.test(ua)) {
    data.browser = 'Chrome'
  } else if (/opera/i.test(ua)) {
    data.browser = 'Opera'
  } else if (/iPad/i.test(ua)) {
    data.browser = 'iPad'
  } else if (
    /webkit/i.test(ua) &&
    !(/chrome/i.test(ua) && /webkit/i.test(ua) && /mozilla/i.test(ua))
  ) {
    data.browser = 'Safari'
  } else {
    data.browser = '未知'
  }
  return data
}

// 格式化文件大小 单位：B、KB、MB、GB
const renderSize = value => {
  if (null == value || value == '') {
    return "0 B"
  }
  var unitArr = new Array("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
  var index = 0
  var srcsize = parseFloat(value)
  index = Math.floor(Math.log(srcsize) / Math.log(1024))
  var size = srcsize / Math.pow(1024, index)
  size = size.toFixed(2)
  if (unitArr[index]) {
    return size + unitArr[index]
  }
  return '文件太大'
}

const convertEnum = obj => {
  const list = []
  if (obj) {
    for (let key in obj) {
      list.push({
        text: obj[key],
        value: key
      })
    }
  }
  return list
}

const copy = msg => {
  if(msg){
    let oInput = document.createElement('input');     //创建一个隐藏input（重要！）
    oInput.value = msg;    //赋值
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    oInput.className = 'oInput';
    oInput.style.display = 'none';
  }
}

const addZero = (d, splitTxt) => {
  let s = d.split(splitTxt);
  let res = '';
  for (let i = 0; i < s.length; i++) {
    if (s[i] * 1 < 10)
      res += `${0}${s[i]}`;
    else
      res += s[i];

    if (i !== s.length - 1)
      res += splitTxt;
  }

  return res;
}

const time2Date = (t) => {
  let n = new Date(t);
  const m = n.getMonth()+1 < 10? `0${n.getMonth()+1}`: n.getMonth()+1;
  const d = n.getDate() < 10? `0${n.getDate()}`: n.getDate();
  const hh = n.getHours() < 10? `0${n.getHours()}`: n.getHours();
  const mm = n.getMinutes() < 10? `0${n.getMinutes()}`: n.getMinutes();
  const ss = n.getSeconds() < 10? `0${n.getSeconds()}`: n.getSeconds();
  return `${n.getFullYear()}/${m}/${d} ${hh}:${mm}:${ss}`
}

export { renderSize, convertEnum, copy, addZero, time2Date }
