import { Injectable } from "@angular/core";
import { DocumentData } from "@angular/fire/firestore";

@Injectable({
	providedIn: 'root',
})

export class Game {
	
	public players: string[] = [];
	public stack: string[] = [];
	public playedCards: string[] = [];
	public currentPlayer: number = 0;
	public pickCardAnimation = false;
	public currentCard?: string = '';

	constructor() {
		for (let i = 1; i < 14; i++) {
			this.stack.push('ace_' + i);
			this.stack.push('hearts_' + i);
			this.stack.push('clubs_' + i);
			this.stack.push('diamonds_' + i);
		}
		shuffle(this.stack);
	}

	public toJson(){
		return {
			players : this.players,
			stack : this.stack,
			playedCards : this.playedCards,
			currentPlayer : this.currentPlayer,
			pickCardAnimation : this.pickCardAnimation,
			currentCard : this.currentCard
		}
	}

	public fromJson(json: any): Game {
		this.players = json.players || [];
		this.stack = json.stack || [];
		this.playedCards = json.playedCards || [];
		this.currentPlayer = json.currentPlayer || 0;
		this.pickCardAnimation = json.pickCardAnimation || false; // Hinzufügen von pickCardAnimation
		this.currentCard = json.currentCard || ''; // Hinzufügen von currentCard
		return this;
	}
	
}

function shuffle(array: string[]) {
	// prettier-ignore
	let currentIndex = array.length,temporaryValue,randomIndex;
	// while there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it wwith the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}
