import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "shifraai-6c5a3.firebaseapp.com",
  projectId: "shifraai-6c5a3",
  storageBucket: "shifraai-6c5a3.firebasestorage.app",
  messagingSenderId: "830205203154",
  appId: "1:830205203154:web:33b44196346c68a0b6530b"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account'
});
export{auth,provider}
