import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


const { firestore } = firebase;

export { firestore };

export class Firebase {
  db: firestore.Firestore;
  auth: firebase.auth.Auth;
  currentUser: firebase.User;
  isAuthenticated = false;
  _doc : any;

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
    const doc = await this.doc();
    if(!doc) {
      return doc;
    }
    return doc.data();
  }

  async set(doc) {
    const id = (await this.doc()).id
    this.db.collection('usage').doc(id).set(doc);
  }

  async doc(){
    if(!this._doc) {
      this._doc = (await this.db.collection('usage').where('origin', '==', process.env.FIREBASE_ENV).get()).docs[0]
    }

    return this._doc;
  }
}
