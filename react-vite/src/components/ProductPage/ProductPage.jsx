import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MdOutlineStarOutline, MdOutlineStar } from "react-icons/md";
import { thunkGetProductById } from '../../redux/product'
import { thunkAddNewReview, thunkEditReview, thunkRemoveReviewById } from '../../redux/review'
import './ProductPage.css'
import Footer from '../Footer';

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

  if (!product || product.id != productId || !allReviewsObj) return null

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


  if (!mainImage) setMainImage(product.Images.find(product => product.is_cover === true).image_url)

  let productReviews

  productReviews = Object.values(allReviewsObj).filter(review => review.product_id == productId).sort((a , b)=> new Date(b.created_at) - new Date(a.created_at))

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
              <div className='color'>
                <label>Color:</label>
                <select name="bay-blue" id="">
                  <option value="bay-blue">Bay Blue</option>
                  <option value="ebony">Ebony</option>
                  <option value="golden-oak">Golden oak</option>
                  <option value="Kona">Kona</option>
                </select>
              </div>
              <div className='quantity'>
                <label>Quantity:</label>
                <input type="number" min="1" max="10" />
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
              {showReviewForm || !user ? null : <button className="review-button" onClick={()=> setShowReviewForm(!showReviewForm)}>Leave Review</button>}
            </div>
          </div>
          <div className="h-linebreak"></div>
          {showReviewForm ?
              <form className='review-form' onSubmit={handleReviewSubmit} action="">
                <div className='review-rating'>
                  <h5>Rating:</h5>
                  <div>
                    {reviewStars > 0 ? <span onClick={()=> setReviewStars(1)}><MdOutlineStar /></span>: <span onClick={()=> setReviewStars(1)}><MdOutlineStarOutline /></span>}
                    {reviewStars > 1 ? <span onClick={()=> setReviewStars(2)}><MdOutlineStar /></span>: <span onClick={()=> setReviewStars(2)}><MdOutlineStarOutline /></span>}
                    {reviewStars > 2 ? <span onClick={()=> setReviewStars(3)}><MdOutlineStar /></span>: <span onClick={()=> setReviewStars(3)}><MdOutlineStarOutline /></span>}
                    {reviewStars > 3 ? <span onClick={()=> setReviewStars(4)}><MdOutlineStar /></span>: <span onClick={()=> setReviewStars(4)}><MdOutlineStarOutline /></span>}
                    {reviewStars > 4 ? <span onClick={()=> setReviewStars(5)}><MdOutlineStar /></span>: <span onClick={()=> setReviewStars(5)}><MdOutlineStarOutline /></span>}
                  </div>
                {errors.reviewStars && <p className='errors'>{errors.reviewStars}</p>}
                </div>
                <textarea className='input' value={reviewBody} onChange={(e) => setReviewBody(e.target.value)} name="" placeholder='Enter a review' id=""></textarea>
                {errors.reviewBody && <p className='errors'>{errors.reviewBody}</p>}
                <div className='reviewer-buttons'>
                  <button className='review-button' type='submit'>Submit Review</button>
                  <button className='review-button' type='reset' onClick={(e)=> handleReviewCancel(e)}>Cancel</button>
                </div>
              </form>
          : null}
          <div className='review-container'>
            {productReviews.map((review)=>
              <div className='review' key={review.id}>
                <div className='heading'>
                  <div className='review-left'>
                    <span className='review-text'>Review By {review.user}</span>
                    {user?.id == review.user_id ? <div className='user reviewer-buttons'>
                      <button className="review-button" onClick={(e) => handleReviewEdit(e, review)}>Edit</button>
                      <button className="review-button" onClick={(e) => handleReviewDelete(e, review)}>Delete</button>
                    </div>: null}
                  </div>
                  <div className='starRating'>
                    {review.stars > 0 ? <span><MdOutlineStar /></span>: <span><MdOutlineStarOutline /></span>}
                    {review.stars > 1 ? <span><MdOutlineStar /></span>: <span><MdOutlineStarOutline /></span>}
                    {review.stars > 2 ? <span><MdOutlineStar /></span>: <span><MdOutlineStarOutline /></span>}
                    {review.stars > 3 ? <span><MdOutlineStar /></span>: <span><MdOutlineStarOutline /></span>}
                    {review.stars > 4 ? <span><MdOutlineStar /></span>: <span><MdOutlineStarOutline /></span>}
                  </div>
                </div>
                <span>&quot;{review.body}&quot;</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
