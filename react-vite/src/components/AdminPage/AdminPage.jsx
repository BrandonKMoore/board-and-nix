import ProductFormModal from '../ProductFormModal'
import { useSelector } from 'react-redux'
import './AdminPage.css'
import { useState } from 'react'
import ManageProduct from '../ManageProduct'
import Footer from '../Footer'

export default function AdminPage(){
  const user = useSelector(state => state.session.user)
  const [render, setRender] = useState('')
  if (!user) return <span>Loading...</span>

  return (
    <div className="adminPage">
      <div className='hero'>
        <div className='overlay'>
          <div className='content'>
            <h1>My Console</h1>
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
      <Footer />
    </div>
  )
}
