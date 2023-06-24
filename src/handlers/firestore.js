import {
  setDoc,
  doc,
  serverTimestamp,
  collection,
  getDocs
} from 'firebase/firestore'
import { db } from '../lib/firebase.config'

const Firestore = {
  readDocs: (...args) => {
    const [collection_name] = args
    let docs = []
    const ref = collection(db, collection_name) // reference to database
    return new Promise(async resolve => {
      try {
        const snapshots = await getDocs(ref) // pass ref to db as parameter in getDocs
        snapshots.forEach(doc => {
          const d = { ...doc.data() }
          docs.push(d) // push data from firebase to array
        })
        resolve(docs)
      } catch (e) {
        console.log(e)
      }
    })
  },
  writeDoc: (...args) => {
    const [inputs, collection_name] = args
    return new Promise(async resolve => {
      const randomIndex = Math.floor(Math.random() * 1000000000)
      try {
        const docRef = doc(db, collection_name, `${randomIndex}`)
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
