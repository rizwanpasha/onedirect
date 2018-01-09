import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  countries = [];
  count = 1;
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
        console.log(this.countries);
      }).catch(() => {
        console.log("Error");
      });
  }
  ngOnInit() {

  }
}

