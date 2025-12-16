import { burger } from '@/js/modules/burger.js';
import { activeMenuItem } from '@/js/modules/active-menu-item.js';
import { headerScroll } from "@/js/modules/header-scroll.js";
import { initYouTubePlayers } from '@/js/modules/about/youtube-play.js';

document.addEventListener("DOMContentLoaded", () => {
  burger();

  activeMenuItem();

  headerScroll();

    initYouTubePlayers({
        selector: '.video__wrapper',
        autoplay: true,
        stopOthers: true
    });

});

