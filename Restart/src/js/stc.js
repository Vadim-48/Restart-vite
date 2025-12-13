import { burger } from '@/js/modules/burger.js';
import { activeMenuItem } from '@/js/modules/active-menu-item.js';
import { headerScroll } from "@/js/modules/header-scroll.js";
import { initVideoPlayer } from '@/js/modules/about/video-play.js';
import { initPopupToggle } from '@/js/modules/stc/popup.js';
import { initCustomSelect } from '@/js/modules/stc/custom-select.js';
import { initFormValidation } from "@/js/modules/stc/form-validation.js";
import { initPhoneMask } from '@/js/modules/stc/phone-mask.js';

document.addEventListener("DOMContentLoaded", () => {
  burger();

  activeMenuItem();

  headerScroll();

  initVideoPlayer();

  initPopupToggle();

  initCustomSelect();

  initPhoneMask();

  initFormValidation();
});

