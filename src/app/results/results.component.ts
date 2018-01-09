import { Component, OnInit } from '@angular/core';

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
  countryName = true;
  countryCode = true;
  capital = true;
  language = true;

  constructor() {
    fetch('https://raw.githubusercontent.com/mledoze/countries/master/countries.json')
      .then(result => result.json())
      .then(json => {
        json.forEach((data) => {
          this.countries.push({
            "code": data.cca2,
            "name": data.name.common,
            "capital": data.capital,
            "languages": Object.values(data.languages)
          });
        });
      })
      .then(() => {
        this.original = this.countries;
      }).catch(() => {
        console.log("Error");
      });
  }
  ngOnInit() {

  }



  applyFilter(val) {
    this.option = val.target.value;
    this.option = Number(this.option);
    if (this.option === 1) {
      this.countryName = true;
      this.countryCode = true;
      this.capital = true;
      this.language = true;
      console.log(this.option);
    } else if (this.option === 2) {
      this.countryName = true;
      this.countryCode = false;
      this.capital = false;
      this.language = false;
      console.log(this.option);
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
      console.log(this.option);
    } else if (this.option === 5) {
      this.countryName = false;
      this.countryCode = false;
      this.capital = false;
      this.language = true;
      console.log(this.option);
    }
  }

  sort(val) {
    if (val == 1) {
      this.sortByCode()
    } else if (val == 2) {
      this.sortByName()
    } else if (val == 3) {
      this.sortByCapital()
    }
  }

  sortByCode() {
    // this.countries.sort(function (c1, c2) {
    //   console.log(c1);
    //   if (c1.cca2 > c2.cca2) return 1;
    //   else if (c1.cca2 == c2.cca2) return 0;
    //   return -1;
    // });
  }
  sortByName() {

    // this.countries.sort(function (c1, c2) {
    //   if (c1.name.common > c2.name.common) return 1;
    //   else if (c1.cca2 == c2.cca2) return 0;
    //   return -1;
    // });
  }
  sortByCapital() {

  }


}

