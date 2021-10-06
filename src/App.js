import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import initializeAuthentication from './Firebase/Firebaseinitialize';
import { useState } from 'react';

const provider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

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
  const handleSignout=()=>{
    signOut(auth).then(() => {
      setUser({});
    })
  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIN}>Google Sign In</button>
      <button onClick={handleGithubSignIN}>Github Sign In</button>
      <button onClick={handleSignout}>Sign Out</button>
      {
        user.email && <div>
           <h2>Nmae: {user.name}</h2>
           <h4>Email: {user.email}</h4>
           <img src={user.photoURL} alt="" />
           </div>
      }
      
    </div>
  );
}

export default App;
