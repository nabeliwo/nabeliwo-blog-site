import removeClass from '../utility/removeClass';
import addClass from '../utility/addClass';

export default class ToggleMenu {
  constructor(btn, area) {
    this.btn = btn;
    this.area = area;
    this.isVisible = false;
  }

  init() {
    this.btn.addEventListener('click', this.toggle.bind(this), false);
  }

  toggle() {
    if (this.isVisible) {
      removeClass(this.btn, 'is-active');
      removeClass(this.area, 'is-active');

      this.isVisible = false;

    } else {
      addClass(this.btn, 'is-active');
      addClass(this.area, 'is-active');

      this.isVisible = true;
    }
  }
};
