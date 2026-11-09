import './style.css';
import { renderNavbar } from './components/navbar.js';
import { initRouter } from './router.js';

const navbarContainer = document.querySelector('#navbar');
const appContainer = document.querySelector('#app');

renderNavbar(navbarContainer);
initRouter(appContainer);
