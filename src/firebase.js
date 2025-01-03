import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCS-ti6qIeoxHDHfstwZhlu7GcuH8zpA68",
  authDomain: "loxar-ef44a.firebaseapp.com",
  databaseURL: "https://loxar-ef44a-default-rtdb.firebaseio.com",
  projectId: "loxar-ef44a",
  storageBucket: "loxar-ef44a.firebasestorage.app",
  messagingSenderId: "674603215415",
  appId: "1:674603215415:web:7238065576bf89d009adb2",
  measurementId: "G-8JKESZKGZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export default app;
