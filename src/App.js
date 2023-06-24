import { useMemo, useContext, useEffect } from 'react'
import app from './lib/firebase.config'
import { Context } from './context'
import Card from './components/Card'
import Layout from './components/Layout'
import './App.css'

function App () {
  const { state } = useContext(Context)
  const count = useMemo(() => {
    return `you have ${state.items.length} image${
      state.items.length > 1 ? 's' : ''
    }`
  }, [state.items])
  useEffect(() => {
    app()
  }, [])
  return (
    <Layout>
      <h1 className='text-center'>Gallery</h1>
      {count}
      <div className='row'>
        {state.items.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>
    </Layout>
  )
}
export default App
