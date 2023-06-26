import { createContext, useContext, useReducer } from 'react'
import Firestore from '../handlers/firestore'

const { readDocs } = Firestore
// keep logic and presentation separate using Context api
export const Context = createContext()
// Move all state management to Context
const photos = []

const initialState = {
  items: photos,
  count: photos.length,
  inputs: { title: null, file: null, path: null },
  isCollapsed: false
}
const handleOnChange = (state, e) => {
  if (e.target.name === 'file') {
    return {
      ...state.inputs,
      file: e.target.files[0],
      path: URL.createObjectURL(e.target.files[0])
    }
  } else {
    return { ...state.inputs, title: e.target.value }
  }
}

function reducer (state, action) {
  switch (action.type) {
    case 'setItem':
      return {
        ...state,
        items: [state.inputs, ...state.items],
        count: state.items.length + 1,
        inputs: { title: null, file: null, path: null }
      }
    case 'setItems':
      return {
        ...state,
        items: action.payload.items
      }
    case 'setInputs':
      return {
        ...state,
        inputs: handleOnChange(state, action.payload.value)
      }
    case 'collapse':
      return {
        ...state,
        isCollapsed: action.payload.bool
      }
    default:
      return state
  }
}
// you set up a Provider, argument children allows any children to share data with Provider
// wrap App component in index.js with Provider component
// any child of the App component to also subscribe to Provider component (global)
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const read = async () => {
    const items = await readDocs('stocks')
    dispatch({ type: 'setItems', payload: { items } })
  }
  return (
    <Context.Provider value={{ state, dispatch, read }}>
      {children}
    </Context.Provider>
  )
}

export const useFirestoreContext = () => {
  return useContext(Context)
}

export default Provider
