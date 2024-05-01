import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { thunkGetProductById } from '../../redux/product'
import './ProductPage.css'

export default function ProductPage(){
  const { product } = useSelector(state => state.product)
  const allReviews = useSelector(state => state.review.allReviews)
  const [ mainImage, setMainImage ] = useState('')
  const [ showReviewForm, setShowReviewForm ] = useState(false)
  const dispatch = useDispatch()
  const { productId } = useParams()

  useEffect(()=>{
    dispatch(thunkGetProductById(productId))
  }, [dispatch, productId])

  if (!product || product.id != productId || !allReviews) return <span>Loading...</span>
  if (!mainImage) setMainImage(product.Images.find(product => product.is_cover === true).image_url)

  const productReviews = allReviews.filter(review => review.product_id == productId)

  return (
    <div className="productPage">
      <div className='container'>
        <div className='product-main'>
          <div className='left'>
            <div className='image-container'>
              <img src={mainImage} alt="" />
            </div>
            <div className='product-image-carousel'>
              {product.Images.map((image) => <div className='carousel-image' key={image.id}>
                <img onClick={()=> setMainImage(image.image_url)} src={image.image_url} alt="" />
              </div>)}
            </div>
          </div>
          <div className="right">
            <div className='short-details'>
              <h1>{product.name}</h1>
              <span>${product.price}</span>
            </div>
            <div className='h-linebreak'></div>
            <div className='selection'>
              <div className='size'>
                <span>Size:</span>
              </div>
              <div className='color'>
                <span>Color:</span>
              </div>
              <div className='quantity'>
                <span>Quantity:</span>
              </div>
              <button>Add to cart</button>
            </div>
          </div>
        </div>
        <div className='product-details'>
          <h2>Product Details</h2>
          <div className="h-linebreak"></div>
          <p>{product.description}</p>
        </div>
        <div className='product-reviews'>
          <div>
            <h2>Reviews</h2>
            <button onClick={()=> setShowReviewForm(!showReviewForm)}>Leave Review</button>
          </div>
          <div className="h-linebreak"></div>
          <form>
        
          </form>
          <div className='review-container'>
            {productReviews.map((review)=>
              <div className='review' key={review.id}>
                <div>Review By {review.user_id}</div>
                <div>Stars {review.stars}</div>
                <div>Comment {review.body}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
