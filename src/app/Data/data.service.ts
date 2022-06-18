import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private cellierSource = new BehaviorSubject<string>("default cellier");
    ceCellierData = this.cellierSource.asObservable();
    
    constructor() { }

    changeCellier(cellierData: string) {
        this.cellierSource.next(cellierData)
    }
}
