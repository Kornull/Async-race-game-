import Filters from '../../viev/filter-blocks/filter';
import FilterBlocksDiv from '../../viev/filter-blocks/filters-blocks';
import employee from '../../../laptop.json';
import SortedCard from '../sorted';
import FilterYear from '../../viev/filter-blocks/filter-year';
import * as noUiSlider from 'nouislider';

class Search extends FilterBlocksDiv {
  sort: SortedCard;
  nameFilter: Filters;
  filterUi: FilterYear;
  search: HTMLDivElement;
  brands: string[];
  yearArr: string[];
  years: string[];
  constructor() {
    super();
    this.nameFilter = new Filters();
    this.sort = new SortedCard();
    this.search = document.createElement('div');
    this.brands = ['Lenovo', 'Asus', 'Acer', 'HP', 'Honor', 'Apple'];
    this.filterUi = new FilterYear();
    this.yearArr = [];
    this.years = ['2019', '2020', '2021', '2022'];
  }
  create() {
    this.search.className = 'main__filter filter';
    this.search.append(this.nameFilter.runSearch());
    this.search.append(this.nameFilter.runBtn());

    return this.search;
  }
  runSearch() {
    this.sortAll = this.sortAll.concat(this.years);
    if (!this.brandCount.includes('year')) this.brandCount.push('year');
    this.search.addEventListener('click', (ev: MouseEvent) => {
      const el = ev.target as HTMLButtonElement;
      if (el.id.toString() !== 'slider-round') {
        const slider = <noUiSlider.target>document.querySelector('.slider-year');
        if (
          el.classList.toString() === 'noUi-touch-area' ||
          el.classList.toString() === 'noUi-connect' ||
          el.classList.toString() === 'noUi-connects'
        ) {
          slider.noUiSlider?.on('update', (values) => {
            this.yearArr = [];
            this.years.forEach((x) => {
              this.sortAll = this.sortAll.filter((e) => e !== x);
            });
            // if (!this.brandCount.includes('year')) this.brandCount.push('year');
            this.copySortAll.push(el.id);
            for (let i = Math.floor(+values[0]); i <= Math.floor(+values[1]); i++) {
              this.yearArr.push(i.toString());
            }
            this.sortAll = this.sortAll.concat(this.yearArr);
            this.sortAll = Array.from(new Set(this.sortAll));
            this.sort.newSortArr(this.sortAll, this.brandCount.length);
          });
        }
        this.sortAll = this.sortAll.concat(this.yearArr);
        this.sortAll = Array.from(new Set(this.sortAll));
        if (el.id === 'search') {
          document.querySelectorAll('.btn__brand').forEach((b) => b.classList.remove('active'));
          el.addEventListener('keyup', () => {
            if (el.value.length !== 0) {
              let count = 0;
              this.keyname = this.keyname.filter((keyname) => keyname !== 'btn__brand');
              this.keyname = this.keyname.filter((keyname) => keyname !== 'search');
              this.brandCount = this.brandCount.filter((br) => br !== 'btn__brand');
              employee.forEach((e) => {
                this.sortAll = this.sortAll.filter((brand) => brand !== e.brand);
              });
              employee.forEach((e) => {
                if (e.brand.toLowerCase().includes(el.value.toLowerCase())) {
                  if (!this.sortAll.includes(e.brand)) {
                    this.sortAll.push(e.brand);
                    this.brandCount.push('btn__brand');
                    this.keyname.push('btn__brand');
                  }
                }
              });
              this.brandCount = Array.from(new Set(this.brandCount));

              this.brands.forEach((br) => {
                if (this.sortAll.includes(br)) {
                  count++;
                }
              });
              if (count === 0) {
                this.keyname.push('search');
                this.sort.emptyArr();
              } else {
                this.sort.newSortArr(this.sortAll, this.brandCount.length);
              }
            } else {
              this.brands.forEach((br) => {
                this.sortAll = this.sortAll.filter((e) => e !== br);
                this.brandCount = this.brandCount.filter((e) => e !== 'btn__brand');
                this.keyname = this.keyname.filter((e) => e !== 'btn__brand');
              });
              if (this.sortAll.length === 0) {
                this.sort.newSortArr(this.brands, 1);
              } else {
                this.sort.newSortArr(this.sortAll, this.brandCount.length);
              }
            }
          });
        } else if (el.id !== '') {
          el.classList.toggle('active');
          if (!this.sortAll.includes(el.id)) {
            if (!this.brandCount.includes(el.classList[1])) {
              this.brandCount.push(el.classList[1]);
              this.copySortAll.push(el.id);
            }
            this.keyname.push(el.classList[1]);
            this.sortAll.push(el.id);
            // console.log('sort1 = !', this.sortAll);
            // console.log('keyname = 1', this.keyname);
            // console.log('brandcount = 1', this.brandCount);
          } else {
            this.sortAll.splice(this.sortAll.indexOf(el.id), 1);
            this.keyname.splice(this.keyname.indexOf(el.classList[1]), 1);
            this.copySortAll.splice(this.sortAll.indexOf(el.id), 1);
            if (!this.keyname.includes(el.classList[1]))
              this.brandCount.splice(this.brandCount.indexOf(el.classList[1]), 1);
          }
          if (this.sortAll.length === 0 && !this.keyname.includes('search')) {
            this.sort.newSortArr(this.brands, 1);
          } else if (this.keyname.includes('search')) {
            this.sort.emptyArr();
          } else {
            this.sort.newSortArr(this.sortAll, this.brandCount.length);
          }
        }
      }
    });
  }
}

export default Search;
