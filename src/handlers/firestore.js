import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase.config'

const Firestore = {
  writeDoc: (...args) => {
    const [inputs, collection_name] = args
    return new Promise(async resolve => {
      const randomIndex = Math.floor(Math.random() * 1000000000)
      try {
        const docRef = doc(db, 'stocks', `${randomIndex}`)
        // need to specify the field and value to create new doc
        await setDoc(docRef, {
          title: inputs.title,
          path: inputs.path,
          createdAt: serverTimestamp()
        })
        resolve('new doc successfully inserted')
      } catch (e) {}
    })
  }
}

export default Firestore
