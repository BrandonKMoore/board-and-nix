import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

export default function LandingPage(){
  const navigate = useNavigate()
  return (
    <div className="landingPage">
      <div className="hero">
        <div className="overlay">
          <div className="content">

              <div><h1>Furnishing your life</h1><h1> with the natural</h1><h1>beauty of wood</h1></div>
              <button onClick={()=> navigate('/products')}>BROWSE COLLECTION</button>
          </div>
        </div>
      </div>
      <div className='body'>
      </div>
    </div>
  )
}
