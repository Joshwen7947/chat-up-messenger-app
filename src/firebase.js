import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyDgeGQ9iaNStgBCCqnRJRNTElMaG7BZDTk',
	authDomain: 'chat-up-b68bf.firebaseapp.com',
	projectId: 'chat-up-b68bf',
	storageBucket: 'chat-up-b68bf.appspot.com',
	messagingSenderId: '379230491477',
	appId: '1:379230491477:web:d213f802485792a68fd5dc',
	measurementId: 'G-WWJTTGYD84',
});

const db = firebaseApp.firestore();

export default db;
