import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export class Firebase {
  db: firebase.firestore.Firestore;
  auth: firebase.auth.Auth;
  currentUser: firebase.User;
  isAuthenticated = false;

  setUp() {
    const app = firebase.initializeApp({
      apiKey: process.env.API_KEY,
      databaseURL: process.env.DATABASE_URL,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID
    });

    this.db = app.firestore();
    this.auth = app.auth();
    this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)

    this.auth.onAuthStateChanged(((user) => {
      this.isAuthenticated = user != null;
      this.currentUser = user;
    }).bind(this));
  }

  async get() {
    const collection =  await this.db.collection('usage').where('origin', '==', 'staging').get()
    return collection.docs[0].data();
  }
}
