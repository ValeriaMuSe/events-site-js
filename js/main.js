import { initializeButtons } from './modules/config/config.js';

initializeButtons();

if ( localStorage.getItem ('favorites') === null ) {
    localStorage.setItem ('favorites', '[]') ;
    localStorage.setItem ('going', '[]') ;
    localStorage.setItem ('interested', '[]');

}

