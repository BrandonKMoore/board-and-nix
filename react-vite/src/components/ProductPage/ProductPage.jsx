import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MdOutlineStarOutline, MdOutlineStar } from "react-icons/md";
import { thunkGetProductById } from '../../redux/product'
import { thunkAddNewReview, thunkEditReview, thunkRemoveReviewById } from '../../redux/review'
import './ProductPage.css'

export default function ProductPage(){
  const dispatch = useDispatch()
  const { productId } = useParams()
  const user = useSelector(state => state.session.user)
  const { product } = useSelector(state => state.product)
  const allReviewsObj = useSelector(state => state.review.allReviews)
  const [mainImage, setMainImage] = useState('')
  const [showReviewForm, setShowReviewForm ] = useState(false)
  const [reviewStars, setReviewStars] = useState(0)
  const [reviewBody, setReviewBody] = useState("")
  const [errors, setErrors] = useState({})
  const [isNew, setIsNew] = useState(true)
  const [currReview, setCurrReview] = useState({})

  useEffect(()=>{
    dispatch(thunkGetProductById(productId))
  }, [dispatch, productId])

  const resetReviewForm = () => {
    setIsNew(true)
    setReviewStars(0)
    setReviewBody('')
    setErrors({})
    setCurrReview({})
    setShowReviewForm(false)
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()

    const newError = {}

    if (!reviewStars) newError.reviewStars = 'Select atleast 1 star for rating'
    if (reviewBody.length < 30) newError.reviewBody = "Enter atleast 30 characters for review"

    if (Object.entries(newError).length > 0) return setErrors(newError)

    let serverResponse;

    const reviewFormData = new FormData()
    reviewFormData.append('user_id', user.id)
    reviewFormData.append('product_id', product.id)
    reviewFormData.append('body', reviewBody)
    reviewFormData.append('stars', reviewStars)

    if(isNew){
      serverResponse = await dispatch(thunkAddNewReview(reviewFormData))
    } else {
      serverResponse = await dispatch(thunkEditReview(reviewFormData, currReview))
    }

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      resetReviewForm()
    }
  }

  const handleReviewCancel = (e) => {
    e.preventDefault()
    resetReviewForm()
  }

  const handleReviewEdit = (e, review) => {
    e.preventDefault()
    setIsNew(false)
    setShowReviewForm(true)
    setCurrReview(review)
    setReviewBody(review.body)
    setReviewStars(review.stars)
  }

  const handleReviewDelete = (e, review) => {
    e.preventDefault()
    dispatch(thunkRemoveReviewById(review.id))
    resetReviewForm()
  }


  if (!product || product.id != productId || !allReviewsObj) return
  if (!mainImage) setMainImage(product.Images.find(product => product.is_cover === true).image_url)

  let productReviews

  productReviews = Object.values(allReviewsObj).filter(review => review.product_id == productId).sort((a , b)=> new Date(b.created_at) - new Date(a.created_at))

  console.log(productReviews)
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
              <button onClick={()=> alert('Feature Coming Soon')}>Add to cart</button>
            </div>
          </div>
        </div>
        <div className='product-details'>
          <h2>Product Details</h2>
          <div className="h-linebreak"></div>
          <p>{product.description}</p>
        </div>
        <div className='product-reviews'>
          <div className='header'>
            <h2>Reviews</h2>
            <div>
              {showReviewForm || !user ? null : <button onClick={()=> setShowReviewForm(!showReviewForm)}>Leave Review</button>}
            </div>
          </div>
          <div className="h-linebreak"></div>
          {showReviewForm ?
              <form onSubmit={handleReviewSubmit} action="">
                <div className='review-rating'>
                  <h5>Rating:</h5>
                  <div>
                    {reviewStars > 0 ? <span onClick={()=> setReviewStars(1)}><MdOutlineStar /></span>: <span onClick={()=> setReviewStars(1)}><MdOutlineStarOutline /></span>}
                    {reviewStars > 1 ? <span onClick={()=> setReviewStars(2)}><MdOutlineStar /></span>: <span onClick={()=> setReviewStars(2)}><MdOutlineStarOutline /></span>}
                    {reviewStars > 2 ? <span onClick={()=> setReviewStars(3)}><MdOutlineStar /></span>: <span onClick={()=> setReviewStars(3)}><MdOutlineStarOutline /></span>}
                    {reviewStars > 3 ? <span onClick={()=> setReviewStars(4)}><MdOutlineStar /></span>: <span onClick={()=> setReviewStars(4)}><MdOutlineStarOutline /></span>}
                    {reviewStars > 4 ? <span onClick={()=> setReviewStars(5)}><MdOutlineStar /></span>: <span onClick={()=> setReviewStars(5)}><MdOutlineStarOutline /></span>}
                  </div>
                </div>
                  {errors.reviewStars && <p>{errors.reviewStars}</p>}
                <textarea className='input' value={reviewBody} onChange={(e) => setReviewBody(e.target.value)} name="" placeholder='Enter a review' id=""></textarea>
                  {errors.reviewBody && <p>{errors.reviewBody}</p>}
                <div className='review-buttons'>
                  <button className='button' type='submit'>Submit Review</button>
                  <span className='button' onClick={(e)=> handleReviewCancel(e)}>Cancel</span>
                </div>
              </form>
          : null}
          <div className='review-container'>
            {productReviews.map((review)=>
              <div className='review' key={review.id}>
                <div>Review By {review.user_id}</div>
                <div>Stars {review.stars}</div>
                <div>Comment {review.body}</div>
                {review.user_id == user.id ? <div className='reviewer-buttons'>
                  <button onClick={(e) => handleReviewEdit(e, review)}>Edit</button>
                  <button onClick={(e) => handleReviewDelete(e, review)}>Delete</button>
                  </div>: null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
