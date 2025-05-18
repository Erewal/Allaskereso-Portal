import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData,query,where } from '@angular/fire/firestore';
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

  getSurgosMunkak(): Observable<Munka[]> {
  const ref = collection(this.firestore, 'Munka');
  const q = query(ref, where('surgosmunkaeroKell', '==', true));
  return collectionData(q, { idField: 'id' }) as Observable<Munka[]>;
}

getBudapestiMunkak(): Observable<Munka[]> {
  const ref = collection(this.firestore, 'Munka');
  const q = query(ref, where('varos', '==', 'Budapest'));
  return collectionData(q, { idField: 'id' }) as Observable<Munka[]>;
}

}

