import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { serializePath } from '@angular/router/src/url_tree';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  original = [];
  countries = [];
  count = 1;
  val = 0;
  option: number = 1;
  all = true;

  showErrorMsg = false;
  showServerErrorMsg = false;
  countryName = true;
  countryCode = true;
  capital = true;
  language = true;

  fakeArray;
  pageLength = 0;
  start = 0;
  end = 20;

  constructor(private dataService: DataService) {
    fetch('https://raw.githubusercontent.com/mledoze/countries/master/countries.json')
      .then(result => result.json())
      .then(json => {
        json.forEach((data) => {
          this.original.push({
            "code": data.cca2,
            "name": data.name.common,
            "capital": data.capital,
            "languages": Object.values(data.languages)
          });
        });
        this.showServerErrorMsg = false;
      })
      .then(() => {
        this.countries = this.original;
        this.setPageSize(this.countries);
      })
      .catch(() => {
        console.error("Server Error, Unable to retrive any data.");
        this.showServerErrorMsg = true;
      });
  }
  ngOnInit() {
    this.dataService.search.subscribe((search_key) => {
      if (search_key.length == 0) {
        this.countries = this.original;
        this.setPageSize(this.countries);
      } else {
        var pattern = new RegExp(search_key, 'ig');
        this.countries = this.original.filter((item) => {
          return pattern.test(item.code)
            || pattern.test(item.name)
            || pattern.test(item.capital)
            || pattern.test(item.languages);
        });
        this.setPageSize(this.countries);
      }
      if (this.countries.length == 0) {
        this.showErrorMsg = true;
      } else {
        this.showErrorMsg = false;
      }
    });
  }

  setPageSize(updatedCountries) {
    this.pageLength = Math.ceil(updatedCountries.length / 20);
    this.fakeArray = new Array(this.pageLength);
  }

  applyFilter(val) {
    this.option = val.target.value;
    this.option = Number(this.option);
    if (this.option === 1) {
      this.countryName = true;
      this.countryCode = true;
      this.capital = true;
      this.language = true;
    } else if (this.option === 2) {
      this.countryName = true;
      this.countryCode = false;
      this.capital = false;
      this.language = false;
    } else if (this.option === 3) {
      this.countryName = false;
      this.countryCode = true;
      this.capital = false;
      this.language = false;
    } else if (this.option === 4) {
      this.countryName = false;
      this.countryCode = false;
      this.capital = true;
      this.language = false;
    } else if (this.option === 5) {
      this.countryName = false;
      this.countryCode = false;
      this.capital = false;
      this.language = true;
    }
  }

  onPage(page_num, event) {
    this.countries = this.original.slice(page_num * 20 - 20, page_num * 20);
  }


  sort(type: number) {
    if (type == 1) {
      this.sortByCode();
    } else {
      this.sortByName();
    }
  }

  sortByCode() {
    this.countries.sort((a, b) => {
      if (a.code.toUpperCase() > b.code.toUpperCase()) return 1;
      else if (a.code.toUpperCase() == b.code.toUpperCase()) return 0;
      return -1;
    });
  }

  sortByName() {
    this.countries.sort((a, b) => {
      if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
      else if (a.name.toUpperCase() == b.name.toUpperCase()) return 0;
      return -1;
    });
  }
}

