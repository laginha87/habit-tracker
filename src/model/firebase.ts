import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

export class Firebase {
  db: firebase.database.Database;
  user: firebase.User;

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

    this.db = app.database();
    this.db.goOnline();
    // window.user = firebase.auth().currentUser;

    firebase.auth().onAuthStateChanged(function(user) {
      console.log(user)
    });


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
