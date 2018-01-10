import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DataService {

    // service used to forward the search query from header component to results component
    search = new Subject<string>();
}