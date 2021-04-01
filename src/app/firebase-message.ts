import firebase from 'firebase';

export interface FirebaseMessage {
  contents: string;
  timestamp: firebase.firestore.Timestamp;
}
