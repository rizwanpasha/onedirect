import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { serializePath } from '@angular/router/src/url_tree';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  // arrays stores actual values fetched from api request and a copy of it
  original = [];
  countries = [];

  // error messages variables
  showErrorMsg = false;
  showServerErrorMsg = false;

  // values used to show columns during filteration
  all = true;
  countryName = true;
  countryCode = true;
  capital = true;
  language = true;

  // values used for pagination
  fakeArray;
  pageLength = 0;
  start = 0;
  end = 20;

  count = 1;
  val = 0;
  option: number = 1;

  constructor(private dataService: DataService) {
    // fetch API used to get country data from external server
    fetch('https://raw.githubusercontent.com/rizwanpasha/country-details/master/countries.json')
      .then(result => result.json())
      .then(json => {
        json.forEach((data) => {

          // selecting and pushing only necessary data form the API results
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
        // creates a copy of original data and sets paging
        this.countries = this.original;
        this.setPageSize(this.countries);
      })
      .catch(() => {

        // errer handler if server error occures during data fetching
        console.error("Server Error, Unable to retrive any data.");
        this.showServerErrorMsg = true;
      });
  }
  ngOnInit() {

    // service used to get search query which will be used for local search
    this.dataService.search.subscribe((search_key) => {
      // if no search query is found then display the list as it is
      if (search_key.length == 0) {
        this.countries = this.original;
        this.setPageSize(this.countries);
      } else {

        // if a search query is found then use it as pattern for test method which will look for that pattern in list
        var pattern = new RegExp(search_key, 'ig');
        this.countries = this.original.filter((item) => {
          // trying to match pattern in all possible entries
          return pattern.test(item.code)
            || pattern.test(item.name)
            || pattern.test(item.capital)
            || pattern.test(item.languages);
        });
        this.setPageSize(this.countries);
      }

      // if no entries is found then display error message
      if (this.countries.length == 0) {
        this.showErrorMsg = true;
      } else {
        this.showErrorMsg = false;
      }
    });
  }

  // method which sets page numbers for pagination

  setPageSize(updatedCountries) {
    this.pageLength = Math.ceil(updatedCountries.length / 20);
    this.fakeArray = new Array(this.pageLength);
  }


  // method to handle filtering table columns based on option
  applyFilter(val) {
    this.option = val.target.value;
    this.option = Number(this.option);

    if (this.option === 1) {
      // if option 1, then show all columns
      this.toggleColumns(true, true, true, true);
    } else if (this.option === 2) {
      // if optionr 2, then show country name column and hide other columns
      this.toggleColumns(true, false, false, false);
    } else if (this.option === 3) {
      // if option 3, then show country codee column and hide other columns
      this.toggleColumns(false, true, false, false);
    } else if (this.option === 4) {
      // if option 4, then show capital column and hide other columns
      this.toggleColumns(false, false, true, false);
    } else if (this.option === 5) {
      // if option 2, then show languages column and hide other columns
      this.toggleColumns(false, false, false, true);
    }
  }

  toggleColumns(countryName, countryCode, capital, language) {
    this.countryName = countryName;
    this.countryCode = countryCode;
    this.capital = capital;
    this.language = language;
  }

  // shows which items to show on each page, ie 20 items per page
  onPage(page_num, event) {
    this.countries = this.original.slice(page_num * 20 - 20, page_num * 20);
  }

  // method to sort data based on users option
  sort(type: number) {
    if (type == 1) {
      this.sortByCode();
    } else if (type == 2) {
      this.sortByName();
    }
    else {
      this.sortByCapital();
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

  sortByCapital() {
    this.countries.sort((a, b) => {
      if (a.capital.toUpperCase() > b.capital.toUpperCase()) return 1;
      else if (a.capital.toUpperCase() == b.capital.toUpperCase()) return 0;
      return -1;
    });
  }
}

