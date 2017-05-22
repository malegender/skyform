import Vue from 'vue'
import Vuetify from 'vuetify'
import lodash from 'lodash'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(Vuetify)

window.app = new Vue({
    router,
    // template: '<App/>',
    // components: { App }
    render: h => h(App)
}).$mount('#app');
