import {Router} from '@vaadin/router';

const router = new Router(document.querySelector('.root'));
router.setRoutes([
  {path: '/home-page', component: 'homepage-comp'},
  {path: '/new-game', component: 'newuser-comp'},
  {path: '/sala-code', component: 'salacode-comp'},
  {path: '/room-page', component: 'roompage-comp'},
  {path: '/instructions', component: 'instructions-comp'},
  {path: '/game-page', component: 'game-comp'},
  {path: '/waiting-page', component: 'waiting-comp'},
  {path: '/results-page', component: 'result-comp'},
  
]);