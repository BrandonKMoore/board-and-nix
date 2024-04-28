import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './ProductPage.css'
import { useEffect } from 'react'
import { thunkGetProductById } from '../../redux/product'

export default function ProductPage(){
  const { product } = useSelector(state => state.product)
  const dispatch = useDispatch()
  const { productId } = useParams()

  console.log(product)

  useEffect(()=>{
    dispatch(thunkGetProductById(productId))
  }, [dispatch, productId])

  if (!product) return <span>Loading...</span>
  return (
    <div className="productPage">
      <div className='hero'>
        <div className='overlay'>
          <div className='content'>
            <h1>Welcome to </h1>
          </div>
        </div>
      </div>
    </div>
  )
}
