import { inject, Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Injectable({
	providedIn: 'root',
})
export class GamesService {
	firestore: Firestore = inject(Firestore);
	lastActionTime: number | null = null;

	constructor() {

	}

	getGamesRef() {
		return collection(this.firestore, 'games');
	}

	getSingleGame(docID: string){
		return doc(collection(this.firestore, 'games'), docID)
	}


}
