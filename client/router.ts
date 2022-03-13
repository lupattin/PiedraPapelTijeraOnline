import {Router} from '@vaadin/router';

const router = new Router(document.querySelector('.root'));
router.setRoutes([
  {path: '/', component: 'homepage-comp'},
  {path: '/home-page', component: 'homepage-comp'},
  {path: '/new-game', component: 'newuser-comp'},
  {path: '/sala-code', component: 'salacode-comp'},
  {path: '/room-page', component: 'roompage-comp'},
  {path: '/logging-page', component: 'logging-comp'},
  {path: '/instructions', component: 'instructions-comp'},
  {path: '/game-page', component: 'game-comp'},
  {path: '/waiting-play', component: 'waiting-play'},
  {path: '/waiting-page', component: 'waiting-comp'},
  {path: '/results-page', component: 'result-comp'},
  {path: '/tied-page', component: 'tied-comp'},
  {path: '/win-page', component: 'win-comp'},
  {path: '/loss-page', component: 'loss-comp'},
  
]);