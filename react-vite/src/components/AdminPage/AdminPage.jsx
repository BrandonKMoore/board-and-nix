import ProductFormModal from '../ProductFormModal/ProductFormModal'
import { useSelector } from 'react-redux'
import './AdminPage.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ManageProduct from '../ManageProduct/ManageProduct'

export default function AdminPage(){
  const navigate = useNavigate()
  const user = useSelector(state => state.session.user)
  const [render, setRender] = useState('')
  if (!user) return <span>Loading...</span>
  if (user.username != 'Demo'){
    alert('You have to be the administrator to use this feature')
    navigate('/')
  }
  
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
          <li className='selection' onClick={()=> setRender(<ProductFormModal />)}>Create Product</li>
          <li className='selection' onClick={()=> setRender(<ManageProduct />)}>Manage Product</li>
        </ul>
        <div className='main-section'>
            {render}
        </div>
      </div>
    </div>
  )
}
