import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import Router from './routes';

const app = createApp(App);
app.use(Router);
app.mount('#app');
