import Vue from 'vue'
import md5 from 'js-md5';
import App from './App.vue'
import router from './router'
import store from './store'
import {Button, Form, Field, Toast, Icon} from 'vant'
import 'lib-flexible/flexible'

Vue.use(Form)
    .use(Field)
    .use(Toast)
    .use(Button)
    .use(Icon);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

Vue.prototype.$md5 = md5;
Vue.prototype.prefix = prefix;

//把路由放到window上
window.vRouter = router;

Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
}
