import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './css/style.css'
import vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(vuex)
const store = new vuex.Store({
    state:{
      usuario:"",
      clave:"",
    },
    mutations:{
      setUsuario (state,usu){
        state.usuario= usu;
      },
      setClave (state,clave){
        state.clave= clave;
      }
    },
    getters:{
      usuario:(state)=>{
        return state.usuario
      },
      clave:(state)=>{
        return state.clave
      }
    }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')