import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Database, objectVal, ref } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private db: Database) {}

  getLightData(): Observable<any> {
    const ldrRef = ref(this.db, 'ldrValue');
    return objectVal(ldrRef);
  }
}
