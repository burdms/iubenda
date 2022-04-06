function postData(body) {
  return fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  });
}

function form() {
  const form = document.querySelector('form');

  const toggleSection = target => {
    const block = target.closest('.js-calc-section').querySelector('.js-calc-block');

    if (target.checked) {
      block.classList.add('active');
    } else {
      block.classList.remove('active');
    }
  };

  form.addEventListener('change', e => {
    if (e.target.closest('.js-calc-switcher')) {
      toggleSection(e.target);
    }
  });

  form.addEventListener('reset', () => {
    setTimeout(() => {
      document.querySelectorAll('.js-calc-switcher').forEach(item => {
        toggleSection(item.querySelector('input'));
      });

      if (form.querySelector('.select')) {
        form.querySelectorAll('.select').forEach(item => {
          setSelected(item, item.querySelectorAll('.select-list__item')[0], true);
        });
      }
    }, 0);
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    const overlay = document.querySelector('.overlay'),
      overlayText = overlay.querySelector('.overlay-data__text');

    const formData = new FormData(form),
      body = {};

    const toDel = [];
    let banner = false,
      privacy = false;

    overlay.classList.add('active');

    for (const pair of formData.entries()) {
      if (pair[0] === 'banner') {
        banner = true;
      }

      if (pair[0] === 'privacy') {
        privacy = true;
      }
    }

    if (!banner) {
      for (const pair of formData.entries()) {
        if (pair[0].match(/banner/g)) {
          toDel.push(pair[0]);
        }
      }
    }

    if (!privacy) {
      for (const pair of formData.entries()) {
        if (pair[0].match(/privacy/g)) {
          toDel.push(pair[0]);
        }
      }
    }

    toDel.forEach(item => {
      formData.delete(item);
    });

    formData.forEach((value, key) => {
      body[key] = value;
    });

    postData(body)
      .then(response => {
        if (response.status !== 201) {
          throw new Error('Network status is not 201');
        }

        return response.json();
      })
      .then(data => {
        setTimeout(() => {
          overlay.classList.add('loaded');

          overlayText.textContent = 'Yay! Your data has been submitted. You can find it in the console!';

          console.group('Posted data');
          console.log(data);
          console.groupEnd();
        }, 2000);
      })
      .catch(error => {
        console.error(error);

        overlay.classList.add('loaded');

        overlayText.textContent = 'Ops! Something went wrong. You can find error description in the console!';
      })
      .finally(() => {
        overlay.addEventListener('click', () => {
          overlay.classList.remove('active', 'loaded');
        });
      });
  });
}
