export default class Popover {
  constructor(target) {
    this.target = target;
    this.title = `Title: ${this.target.innerText.split(' ')[1]}`;
    this.text = `This is popover of ${this.target.innerText.split(' ')[1]}`;

    this.init();
  }

  init() {
    this.createPopover();
  }

  createMarkup() {
    return `
      <div class="popover-title">${this.title}</div>
      <p class="popover-text">${this.text}<p/>
    `;
  }

  createPopover() {
    const popover = document.createElement('DIV');
    popover.classList.add('popover');
    popover.innerHTML = this.createMarkup(this.text);
    const title = popover.querySelector('.popover-title');
    document.body.append(popover);

    const targetRect = this.target.getBoundingClientRect();

    const targetTop = targetRect.y;
    const targetLeft = targetRect.x;
    const popWidth = popover.offsetWidth;
    const popHeight = popover.offsetHeight;

    popover.dataset.id = this.target.dataset.id;
    popover.style.top = `${targetTop - popHeight + window.pageYOffset - 15}px`;
    popover.style.left = `${targetLeft + window.pageXOffset - (popWidth - targetRect.width) / 2}px`;

    title.style.backgroundColor = this.target.dataset.color;
  }
}
