import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCImGM4jB8Tzx8JFwscYfiDTnYR1ELsMJU",
    authDomain: "whatsapp-b0130.firebaseapp.com",
    projectId: "whatsapp-b0130",
    storageBucket: "whatsapp-b0130.appspot.com",
    messagingSenderId: "528106571974",
    appId: "1:528106571974:web:a979115f2aab5b2e97afc7",
    measurementId: "G-JTMCGQEETD"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth,provider };
  export default db;