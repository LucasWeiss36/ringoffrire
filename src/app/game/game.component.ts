import { CommonModule } from '@angular/common';
import { Component, inject, Injectable, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../firebase-services/games.service';
import { Firestore, updateDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { StartScreenComponent } from '../start-screen/start-screen.component';
import { log } from 'node:console';
import { unsubscribe } from 'node:diagnostics_channel';

@Component({
	selector: 'app-game',
	standalone: true,
	imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, GameInfoComponent],
	templateUrl: './game.component.html',
	styleUrl: './game.component.scss',
})
@Injectable({
	providedIn: 'root',
})
export class GameComponent implements OnInit {

	pickCardAnimation = false;
	currentCard?: string = '';
	game!: Game;
	card!: string[];
	gameID!: string
	unsub: any;

	constructor(public dialog: MatDialog, private route: ActivatedRoute, private gamesService: GamesService) {
		
	}

	ngOnInit(): void {
		this.newGame();
		this.route.params.subscribe((params) => {
			console.log(params['id']);
			this.gameID = params['id']
			
			
		})
		this.loadGame()
	}

	newGame() {
		this.game = new Game();
	}

	takeCard() {
		if (!this.pickCardAnimation) {
			this.currentCard = this.game.stack.pop();
			this.game.currentPlayer++;
			this.pickCardAnimation = true;
			this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
			console.log(this.pickCardAnimation);
			
			this.saveGame()
			setTimeout(() => {
				this.game.playedCards.push(this.currentCard!);
				this.pickCardAnimation = false;
				this.saveGame()
			}, 1000);
			
		}
		
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(DialogAddPlayerComponent);
		dialogRef.afterClosed().subscribe((name: string) => {
			if (name && name.length > 0) {
				this.game.players.push(name);
				this.saveGame()
			}
		});
	}

	async saveGame(){
		await updateDoc(this.gamesService.getSingleGame(this.gameID), this.game.toJson())
	}

	async loadGame() {
		const gameDocRef = this.gamesService.getSingleGame(this.gameID);
	
		this.unsub = onSnapshot(gameDocRef, (docSnapshot) => {
			if (docSnapshot.exists()) {
				const gameData = docSnapshot.data();
				console.log('Daten aus Firestore geladen:', gameData);
				this.game = new Game().fromJson(gameData); 
				
			} else {
				console.error('Dokument nicht gefunden!');
			}
		});
	}
	
}
