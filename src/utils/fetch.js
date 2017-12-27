import axios from 'axios';
import store from '../store';
import vue from 'vue';
// import router from '../router';

// 创建axios实例
const service = axios.create({
  baseURL: 'http://120.77.44.27:13592/webapi/', // api的base_url
  timeout: 5000                  // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.ApiAuthorization = store.getters.token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.Code !== 200) {
      vue.$Message.error({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      });
      if (res.Code === 403 || res.code === 407) {
        vue.$Message.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
        })
      }
      return Promise.reject(error);
    } else {
      return res;
    }
  }, error => {
  vue.$Message.error({
      message: error.message,
      duration: 5 * 1000,
      closable: true
    });
  return Promise.reject(error);
}
)

export default service;
