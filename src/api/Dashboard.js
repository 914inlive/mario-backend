import axiosApi from './AxiosApi.js'

const apiList = {
  getVisitList: `/authority/dashboard/visit`
}

export default {
  getVisitList (data) {
    return new Promise(resolve => {
      const res = {"code":0,"data":{"lastTenUserVisitCount":[{"count":"88","login_date":"2020-08-25"},{"count":"96","login_date":"2020-08-26"},{"count":"104","login_date":"2020-08-27"},{"count":"74","login_date":"2020-08-28"},{"count":"51","login_date":"2020-08-29"},{"count":"18","login_date":"2020-08-30"},{"count":"91","login_date":"2020-08-31"},{"count":"10760","login_date":"2020-09-01"},{"count":"106","login_date":"2020-09-02"},{"count":"54","login_date":"2020-09-03"}],"totalVisitCount":"26186","todayVisitCount":"56","todayIp":"45","lastTenVisitCount":[{"count":"94","login_date":"2020-08-25"},{"count":"96","login_date":"2020-08-26"},{"count":"110","login_date":"2020-08-27"},{"count":"80","login_date":"2020-08-28"},{"count":"53","login_date":"2020-08-29"},{"count":"18","login_date":"2020-08-30"},{"count":"91","login_date":"2020-08-31"},{"count":"10762","login_date":"2020-09-01"},{"count":"107","login_date":"2020-09-02"},{"count":"56","login_date":"2020-09-03"}],"operatingSystemCount":[{"count":"196","operating_system":"Android"},{"count":"1","operating_system":"Chrome OS"},{"count":"5","operating_system":"iOS 11 (iPad)"},{"count":"2","operating_system":"iOS 11 (iPhone)"},{"count":"1","operating_system":"iOS 5 (iPhone)"},{"count":"156","operating_system":"Linux"},{"count":"13536","operating_system":"Mac OS X"},{"count":"17","operating_system":"Ubuntu"},{"count":"10383","operating_system":"Windows 10"},{"count":"1786","operating_system":"Windows 7"},{"count":"75","operating_system":"Windows 8"},{"count":"13","operating_system":"Windows Vista"},{"count":"15","operating_system":"Windows XP"}],"browserCount":[{"browser":"Chrome","count":"24926"},{"browser":"Firefox","count":"755"},{"browser":"Internet Explorer 11","count":"39"},{"browser":"Internet Explorer 7","count":"1"},{"browser":"Microsoft Edge","count":"130"},{"browser":"Opera","count":"15"},{"browser":"Safari","count":"320"}]},"msg":"ok","path":null,"extra":null,"timestamp":1599119311225,"isError":false,"isSuccess":true}
      resolve({data: res});
    });

    // return axiosApi({
    //   method: 'GET',
    //   url: apiList.getVisitList,
    //   data
    // })
  }
}
