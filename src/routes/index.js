import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Sallary from '../views/Sallary.vue';
import Bank from '../views/Bank.vue';
import Daily from '../views/Daily.vue';
import Report from '../views/Report.vue';
import Print from '../views/Print.vue';

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
  {
    path: '/daily',
    name: 'Daily',
    component: Daily,
  },
  {
    path: '/report',
    name: 'Report',
    component: Report,
  },
  {
    path: '/print',
    name: 'Print',
    component: Print,
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
