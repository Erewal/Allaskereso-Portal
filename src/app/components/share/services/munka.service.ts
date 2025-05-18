import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Munka } from '../models/Munka';

@Injectable({
  providedIn: 'root'
})
export class MunkaService {

  constructor(private firestore: Firestore) { }

  getMunkak(): Observable<Munka[]> {
    const munkakCollection = collection(this.firestore, 'Munka');
    return collectionData(munkakCollection, { idField: 'id' }) as Observable<Munka[]>;
  }
}

