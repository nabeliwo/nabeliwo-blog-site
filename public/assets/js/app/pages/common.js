import ToggleMenu from '../modules/ToggleMenu';

const toggleMenu = new ToggleMenu(
  document.getElementsByClassName('js-menu-btn')[0],
  document.getElementsByClassName('js-menu-area')[0]
);

toggleMenu.init();