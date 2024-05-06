import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

export default function LandingPage(){
  const navigate = useNavigate()
  return (
    <div className="landingPage">
      <div className="hero">
        <div className="overlay">
          <div className="content">
              <h1>
                <span>Furnishing your life</span>
                <span>with the natural</span>
                <span>beauty of wood</span>
              </h1>
              <button onClick={()=> navigate('/products')}>BROWSE COLLECTION</button>
          </div>
        </div>
      </div>
      <div className='body'>
      </div>
    </div>
  )
}
