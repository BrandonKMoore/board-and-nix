import ProductFormModal from '../ProductFormModal/ProductFormModal'
import OpenModalButton from '../OpenModalButton'
import { useSelector } from 'react-redux'
import './AdminPage.css'
import { useState } from 'react'

export default function AdminPage(){
  const administrator = useSelector(state => state.session.user)
  const [render, setRender] = useState('')

  if (!administrator) return <span>Loading...</span>
  return (
    <div className="adminPage">
      <div className='hero'>
        <div className='overlay'>
          <div className='content'>
            <h1>Administrator&apos;s Console</h1>
          </div>
        </div>
      </div>
      <div className='main-content container'>
        <ul className='left-section'>
          <li onClick={()=> setRender(<ProductFormModal />)}>Create Product</li>
          <li onClick={()=> setRender(<ProductFormModal />)}>Edit Product</li>
          <li onClick={()=> setRender(<ProductFormModal />)}>Delete Product</li>
        </ul>
        <div className='main-section'>
            {render}
        </div>
      </div>
    </div>
  )
}
