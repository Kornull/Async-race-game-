// eslint-disable-next-line import/no-cycle
import { updateInput } from '../rest/PATCH/patch-run';
import './_car.scss';
import { getCountCars } from '../rest/GET/get-run';
import { CarsAttribute } from '../../types/types';
// eslint-disable-next-line import/no-cycle
import { garageLink } from '../../View/pages/garage/garage';

const createCar = (carChar: CarsAttribute): HTMLDivElement => {
  const car: HTMLDivElement = document.createElement('div');
  car.className = 'car';
  car.innerHTML = `
  <div class="car__name">${carChar.name}</div>
  <svg class="car__icon" fill="${carChar.color}">
  <use xlink:href="../assets/img/car.svg#carview"></use>
  </svg>
  `;
  car.style.color = `${carChar.color}`;
  car.id = `${carChar.id}`;

  car.addEventListener('click', () => updateInput(Number(car.id), carChar.name));
  // setTimeout(() => {
  //   car.removeEventListener('click', () => updateInput(Number(-1), ''));
  // }, 200);

  return car;
};

const create = async (carBlock: HTMLElement[]): Promise<void> => {
  const main: HTMLElement = document.createElement('main');
  main.innerHTML = '';
  main.className = 'main';
  carBlock.forEach((elCar) => {
    main.appendChild(elCar);
  });
  await garageLink(main);
};

export const racing = (carsObj: CarsAttribute[]): void => {
  const ddd: HTMLElement[] = [];
  carsObj.forEach((col: CarsAttribute) => {
    const race = document.createElement('div');
    race.className = 'racing';
    race.innerHTML = `
    <button type="button" class="btn btn__race-start">race</button>
    <button type="button" class="btn btn__race-stop"></button>
    `;
    race.append(createCar(col));
    ddd.push(race);
  });
  create(ddd);
};

export const createCars = async () => {
  const colorArr: CarsAttribute[] = [];
  const carsObj: CarsAttribute[] = await getCountCars();
  carsObj.forEach((key: CarsAttribute) => {
    const objChar: CarsAttribute = {
      name: key.name,
      color: key.color,
      id: key.id,
    };
    colorArr.push(objChar);
  });

  return racing(colorArr);
};
