// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getRemoteConfig } from 'firebase/remote-config';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEr8dX1eI3pyKAxR9sh03z2rpix-HtdwY",
  authDomain: "novedad-bolso.firebaseapp.com",
  projectId: "novedad-bolso",
  storageBucket: "novedad-bolso.firebasestorage.app",
  messagingSenderId: "105396255555",
  appId: "1:105396255555:web:105bb73f3dc5dc4d3f4df6",
  measurementId: "G-D78VFPB59K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const remoteConfig = getRemoteConfig(app);
// Define el tiempo de duración del caché
remoteConfig.settings.minimumFetchIntervalMillis = 300000; // 1 hora

export { remoteConfig };