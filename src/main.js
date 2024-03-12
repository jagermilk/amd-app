import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import uViewPlus from '@/uni_modules/uview-plus'
import 'uno.css'
import './uni.scss'
import { i18n } from './locale'
import { createPinia } from 'pinia';
const pinia = createPinia();
export function createApp() {
	const app = createSSRApp(App);
	app.use(pinia);
	app.use(uViewPlus)
	app.use(i18n)
	app.config.globalProperties.i18n = i18n
	return {
		app,
	};
}
