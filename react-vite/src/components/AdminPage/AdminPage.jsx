import ProductFormModal from '../ProductFormModal/ProductFormModal'
import OpenModalButton from '../OpenModalButton'
import { useSelector } from 'react-redux'
import './AdminPage.css'

export default function AdminPage(){
  const administrator = useSelector(state => state.session.user)

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
      <div>
        <OpenModalButton
          buttonText="New Product"
          modalComponent={<ProductFormModal />}
        />
      </div>
    </div>
  )
}
