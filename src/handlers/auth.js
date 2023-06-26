import { signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../lib/firebase.config'

const provider = new GoogleAuthProvider() // create a new provider
// create a new object for auth
const FirebaseAuth = {
  signIn: () => {
    return new Promise(resolve => {
      signInWithPopup(auth, provider)
        .then(response => {
          resolve(response.user)
        })
        .catch(console.error) // console log error if any with network request
    })
  },
  signOut: () => {
    signOut(auth)
      .then(() => console.log('user logged out'))
      .catch(console.error)
  }
}

export default FirebaseAuth

// going to use context to handle user information
// single source of truth to bypass props drilling
