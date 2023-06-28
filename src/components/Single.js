import { useLocation, useNavigate } from 'react-router-dom'
import { useFirestoreContext } from '../context/FirestoreContext'
import Card from './Card'

const Single = () => {
  const navigate = useNavigate() // allows user to go back
  const { state } = useFirestoreContext() // get global state
  const { state: routerState } = useLocation()
  // we get all items and then find the right one by comparing item id to routerState id
  const item = state.items.find(item => item.id === routerState.id)
  return (
    <>
      <button className='btn btn-link' onClick={() => navigate(-1)}>
        Back
      </button>
      <div className='d-flex justify-content-center mb-5'>
        <Card {...item} /> {/* we then update card with info from item */}
      </div>
    </>
  )
}

export default Single
