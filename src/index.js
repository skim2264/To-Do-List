import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import { compareAsc, format } from 'date-fns'
import { eventListeners, loadPage } from './DOMmanip';

loadPage();
eventListeners();

