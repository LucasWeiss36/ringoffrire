import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideClientHydration(),
		provideAnimationsAsync(),
		importProvidersFrom(
			provideFirebaseApp(() =>
				initializeApp({
					projectId: 'ring-of-fire-300fa',
					appId: '1:784178688981:web:e19738202c3dfe232fc35c',
					storageBucket: 'ring-of-fire-300fa.appspot.com',
					apiKey: 'AIzaSyDhkpXJ0_dZ-YePpM7TQimJcvnOQe7-lOI',
					authDomain: 'ring-of-fire-300fa.firebaseapp.com',
					messagingSenderId: '784178688981',
				})
			)
		),
		importProvidersFrom(provideFirestore(() => getFirestore())),
	],
};
