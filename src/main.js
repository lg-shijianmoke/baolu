import Vue from 'vue'
import App from './App.vue'
// 引入gin-vue-admin前端初始化相关内容
import './core/gin-vue-admin'
// 引入封装的router
import router from '@/router/index'
import '@/permission'
import {
  store
} from '@/store'
Vue.config.productionTip = false

import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

//引入element-ui框架
import ElementUI from "element-ui";
ElementUI.Dialog.props.lockScroll.default = false;
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI);

import axios from 'axios';
Vue.prototype.$axios = axios;

import {
  auth
} from '@/directive/auth'
// 按钮权限指令
auth(Vue)

import {
  createSocket
} from "@/utils/socket"
let wsPath = process.env.VUE_APP_WS_PATH;
let wsPort = process.env.VUE_APP_WS_PORT;
let wsUri;
if (wsPort) {
  wsUri = wsPath + ":" + wsPort + "/ws";
} else {
  wsUri = wsPath + "/ws";
}
createSocket(wsUri)

Vue.prototype.$playStreamInfoMsg = {}
Vue.prototype.$alarmMsg = {}
let getsocketData = (e) => {
  // 创建接收消息函数
  let data = e && e.detail.data;
  let info = JSON.parse(data);
  switch (info.event) {
    case "play_stream_info":
      Vue.prototype.$playStreamInfoMsg = info.data;
      break;
    case "alarm":
      Vue.prototype.$alarmMsg = info.data;
      break;
    default:
      break;
  }
};
window.addEventListener("onmessageWS", getsocketData);

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

export default new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')