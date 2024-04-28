import { useDispatch, useSelector } from 'react-redux'
import './AdminPage.css'

export default function AdminPage(){
  const administrator = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  if (!administrator) return <span>Loading...</span>
  return (
    <div className="adminPage">
      <div className='hero'>
        <div className='overlay'>
          <div className='content'>
            <h1>Administrator's Console</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
