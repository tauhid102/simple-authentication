import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut, FacebookAuthProvider } from "firebase/auth";
import initializeAuthentication from './Firebase/Firebaseinitialize';
import { useState } from 'react';

const provider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

initializeAuthentication();


function App() {
  const auth = getAuth();
  const [user, setUser] = useState({});

  const handleGoogleSignIN = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photoURL: photoURL
        };
        setUser(loggedInUser);
        // ...
      });
  }
  const handleGithubSignIN = () => {
    signInWithPopup(auth, gitHubProvider)
      .then((results) => {
        const { displayName, email, photoURL } = results.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photoURL: photoURL
        };
        setUser(loggedInUser);
      });
  }
  const handleSignout = () => {
    signOut(auth).then(() => {
      setUser({});
    })
  }
  const facebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(result);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  }
  return (
    <div className="App">
      {!user.name ?
        <div>
          <button onClick={handleGoogleSignIN}>Google Sign In</button>
          <button onClick={handleGithubSignIN}>Github Sign In</button>
          <button onClick={facebookSignIn}>Facebook Sign in</button>
        </div>
        :
        <button onClick={handleSignout}>Sign Out</button>
      }

      {
        user.name && <div>
          <h2>Nmae: {user.name}</h2>
          <h4>Email: {user.email}</h4>
          <img src={user.photoURL} alt="" />
        </div>
      }

    </div>
  );
}

export default App;
