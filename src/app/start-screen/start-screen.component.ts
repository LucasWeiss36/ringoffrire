import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GamesService } from '../firebase-services/games.service';
import { Game } from '../../models/game';
import { addDoc } from '@angular/fire/firestore';
import { log } from 'console';

@Component({
	selector: 'app-start-screen',
	standalone: true,
	imports: [],
	templateUrl: './start-screen.component.html',
	styleUrl: './start-screen.component.scss',
})
export class StartScreenComponent {
	constructor(private router: Router, private game: Game, private gamesService: GamesService) {}

	id: string = '';
	async newGame() {
		addDoc(this.gamesService.getGamesRef(), this.game.toJson()).then((gameInfo) => {
			this.router.navigateByUrl('/game/' + gameInfo.id);
			this.id = gameInfo.id;
		});
	}
}
