import Container from '../container/container';
import Basket from '../basket/basket';

class Header {
  basket: Basket;
  container: Container;

  constructor() {
    this.container = new Container();
    this.basket = new Basket();
  }

  Head(): HTMLElement {
    this.basket.basketEl();
    this.basket.basketEndCount();
    this.basket.countIncrement();
    const cont = this.container.createContainer();;
    const head = <HTMLElement>document.createElement('header');
    const logo = <HTMLDivElement>document.createElement('div');
    logo.className = 'header__logo';
    head.className = 'header';
    cont.appendChild(logo);
    cont.appendChild(this.basket.basketEl());
    head.appendChild(cont);
    // cont.createContainer().appendChild();
    // this.countIncrement();
    // this.basketEndCount();
    return head;
  }
}

export default Header;
