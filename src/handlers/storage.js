import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../lib/firebase.config'

// just like FireStore - Create a new object for Storage
const Storage = {
  uploadFile: media => {
    return new Promise(async resolve => {
      try {
        // define directory and naming system for uploaded files
        const mediaRef = ref(storage, `images/${media.title}`)
        uploadBytes(mediaRef, media.file).then(snapshot => {
          resolve({ path: snapshot.metadata.fullPath, name: media.title })
        })
      } catch (e) {
        console.error(e)
      }
    })
  },
  downloadFile: media => { // new handler function for download file 
    return new Promise(async resolve => {
      try {
        const mediaRef = ref(storage, media.path) // create a new path 
        const fileURL = await getDownloadURL(mediaRef) // create URL 
        resolve(fileURL)
      } catch (e) {
        console.error(e)
      }
    })
  }
}
export default Storage
