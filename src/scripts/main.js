//= ./modules/compilance.js
//= ./modules/toggleNotification.js
//= ./modules/setSelected.js
//= ./modules/form.js

window.addEventListener("DOMContentLoaded", () => {
  const circleSize = () => {
    document.querySelector('.compilance-indicator')
      .querySelectorAll('circle')
      .forEach(item => {
        item.setAttribute('stroke-width', window.matchMedia(`(max-width: 1280px)`).matches ? '4' : '8');
        item.setAttribute('r', window.matchMedia(`(max-width: 1280px)`).matches ? '26' : '58');
      });
  };

  let screenFlag = window.matchMedia(`(max-width: 1280px)`).matches;

  window.addEventListener('resize', () => {
    if (screenFlag !== window.matchMedia(`(max-width: 1280px)`).matches) {
      screenFlag = window.matchMedia(`(max-width: 1280px)`).matches;

      circleSize();

      compilance();
    }
  });

  document.addEventListener('click', e => {
    // Large notification banner
    if (e.target.classList.contains('notification__close')) {
      toggleNotification(e.target.closest('.notification'));
    }

    // Select (s.a. select position)
    if (e.target.closest('.select')) {
      const select = document.querySelector('.select');

      setSelected(select, e.target);
    }

    // Tooltips
    if (e.target.closest('.js-tooltip-link')) {
      const tooltip = e.target.closest('.js-tooltip-parent').querySelector('.js-tooltip-item');

      tooltip.classList.toggle('active');

      setTimeout(() => {
        tooltip.classList.remove('active');
      }, 10000);
    }
  });

  circleSize();
  compilance();
  form();
});
