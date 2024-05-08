import { createApp } from 'vue';
// 경로에 ./ 생략 불가능
import './style.css';
// default export (중괄호가 없으면 default export, 중괄호가 있으면 named export)
// vue에는 default export가 없음 -> vue 전용 문법을 씀
import App from './App.vue';

createApp(App).mount('#app');
