import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'; // Für ngModel

@Component({
	selector: 'app-dialog-add-player',
	standalone: true,
	imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
	templateUrl: './dialog-add-player.component.html',
	styleUrl: './dialog-add-player.component.scss',
})
export class DialogAddPlayerComponent {
	constructor(public dialogRef : MatDialogRef<DialogAddPlayerComponent>) {}

	name: string = '';

	onNoClick() {
		this.dialogRef.close();
	}
}
