import Vue from 'vue';
import Router from 'vue-router';
import Clientes from './components/clientes/clientes.vue';
import Login from './components/login/login.vue';
import Detalles from './components/detalles/detalles.vue';

Vue.use(Router);

export default new Router({
    model: 'prueba',
    routes: [{
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/clientes',
        name: 'clientes',
        component: Clientes,
        props: true
    },
    {
        path: '/cliente/:id',
        name: 'detalles',
        component: Detalles,
        props: true
    }
    ]
});