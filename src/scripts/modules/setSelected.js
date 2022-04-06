function setSelected(select, target, reset = false) {
  select.querySelector('.select-list').classList.toggle('active');

  if (target.classList.contains('select-list__item')) {
    select.querySelector('.select__selected > img').setAttribute('src', target.querySelector('img').src);
    select.querySelector('.select__selected > img').setAttribute('alt', target.querySelector('img').alt);

    select.querySelector('input').value = target.querySelector('img').alt;
  }

  if (reset) {
    select.querySelector('.select-list').classList.remove('active');
  }
}
