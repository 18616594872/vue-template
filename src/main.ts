import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import iview from '@/iview';
import 'view-design/dist/styles/iview.css';
import {
    Message,
    Modal
} from 'view-design';

Vue.use(iview)

Vue.config.productionTip = false;

Vue.prototype.$Message = Message;
Vue.prototype.$Modal = Modal;

async function init() {
    try {
        let permission = (await import("@/permission")).permission;
        await permission();
        return "success"
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