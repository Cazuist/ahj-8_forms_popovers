import Popover from './Popover';

const btns = [...document.querySelectorAll('.btn-element')];

window.addEventListener('resize', () => {
  const popover = document.querySelector('.popover');

  if (popover) {
    document.body.removeChild(popover);
  }
});

btns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const popover = document.querySelector('.popover');

    if (!popover) {
      // eslint-disable-next-line no-new
      new Popover(btn);
      return;
    }

    if (popover.dataset.id === event.target.dataset.id) {
      document.body.removeChild(popover);
      return;
    }

    document.body.removeChild(popover);
    // eslint-disable-next-line no-new
    new Popover(btn);
  });
});
