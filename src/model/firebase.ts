import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

export class Firebase {
  db: firebase.database.Database;
  auth: firebase.auth.Auth;
  currentUser: firebase.User;
  isAuthenticated = false;

  setUp(onReady) {
    const app = firebase.initializeApp({
      apiKey: process.env.API_KEY,
      databaseURL: process.env.DATABASE_URL,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID
    });

    this.db = app.database();
    this.db.goOnline();
    this.auth = app.auth();
    this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)

    let setup = false;
    this.auth.onAuthStateChanged(((user) => {
      this.isAuthenticated = user != null;
      this.currentUser = user;
      if (setup == false) {
        onReady();
        setup = true;
      }
    }).bind(this));
  }

  get() {
    return this.db
      .ref("ego/2")
      .once("value")
      .then(snapshot => snapshot.val().value);
  }

  set(value) {
    this.db.ref("ego/2").set({
      value
    });
  }
}
