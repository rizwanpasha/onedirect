import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  // handle search event by sending search key to service 

  onSearch(event) {
    this.dataService.search.next(event.target.value);
  }

}
