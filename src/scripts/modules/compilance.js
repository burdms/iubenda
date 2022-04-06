function compilance() {
  const amount = document.querySelector('.compilance__amount'),
    circle = document.querySelector('.compilance-indicator__ring'),
    circumfirence = 2 * Math.PI * circle.r.baseVal.value;

  circle.style.strokeDasharray = `${circumfirence} ${circumfirence}`;
  circle.style.strokeDashoffset = circumfirence;

  const setProgress = percent => {
    amount.textContent = percent;

    circle.style.strokeDashoffset = circumfirence - percent / 100 * circumfirence;
  };

  // That's made just for... fun, I guess : )
  let z = 29;
  setProgress(z);

  circle.addEventListener('click', e => {
    if (e.target.classList.contains('compilance-indicator__ring')) {
      z = z === 100 ? 0 : z + 1;

      setProgress(z);
    }
  });
}
