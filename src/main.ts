import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import echarts from 'echarts';
import store from '@/store';
import iview from '@/iview';
import 'view-design/dist/styles/iview.css';
import {
    Message,
    Modal
} from 'view-design';
/** 引入日志控制文件 */
import '@/utils/log'

Vue.use(iview)

Vue.config.productionTip = false;

Vue.prototype.$echarts = echarts;
Vue.prototype.$Message = Message;
Vue.prototype.$Modal = Modal;

async function init() {
    try {
        let request = (await import("@/utils/config")).default;
        await request();
        let permission = (await import("@/permission")).permission;
        await permission();
    } catch (error) {
        throw new Error(error)
    }
}

init().then(res => {
    new Vue({
        router,
        store,
        render: (h) => h(App)
    }).$mount('#app');

}).catch(err => {
})