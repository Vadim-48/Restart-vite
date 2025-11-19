import { burger } from './js/modules/burger.js';
import { initSlider } from './js/modules/main/slider.js';

document.addEventListener("DOMContentLoaded", () => {
  burger();
  initSlider();
});


// if (import.meta.hot) {
//   import.meta.hot.on('some-event', () => {
//     window.location.reload(); // повне перезавантаження сторінки
//   });
// }
