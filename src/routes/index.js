import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Sallary from '../views/Sallary.vue';
import Bank from '../views/Bank.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/sallary',
    name: 'Sallary',
    component: Sallary,
  },
  {
    path: '/bank',
    name: 'Bank',
    component: Bank,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const nameUser = localStorage.getItem('my_name');

  if (to.name === 'Home' && nameUser) {
    next({ name: 'Sallary' });
  } else if (to.name !== 'Home' && !nameUser) {
    next({ name: 'Home' });
  } else next();
});

export default router;
