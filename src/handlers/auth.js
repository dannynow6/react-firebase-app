import { signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../lib/firebase.config'

const provider = new GoogleAuthProvider()

const FirebaseAuth = {
  signIn: () => {
    return new Promise(resolve => {
      signInWithPopup(auth, provider)
        .then(response => {
          resolve(response.user)
        })
        .catch(console.error)
    })
  },
  signOut: () => {
    signOut(auth)
      .then(() => console.log('user logged out'))
      .catch(console.error)
  }
}

export default FirebaseAuth
