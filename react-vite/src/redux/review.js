const SET_ALL_REVIEWS = 'review/setAllReviews'
const ADD_NEW_REVIEW = 'review/addNewReview'
const EDIT_REVIEW = 'review/editReview'
const REMOVE_REVIEW = 'review/removeReview'

const setAllReviews = (allReviews) => ({
  type: SET_ALL_REVIEWS,
  payload: allReviews
})

const addNewReview = (review) => ({
  type: ADD_NEW_REVIEW,
  payload: review
})

const editReview = (review) => ({
  type: EDIT_REVIEW,
  payload: review
})
const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  payload: reviewId
})

export const thunkGetAllReviews = () => async (dispatch) => {
  const response = await fetch("/api/reviews/")
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return {'error': data.errors}
    }
    dispatch(setAllReviews(data.all_reviews))
  }
};

export const thunkAddNewReview = (data) => async (dispatch) => {
  const response = await fetch("/api/reviews/", {
    method: "POST",
    body: data
  })
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return {'error': data.errors}
    }
    dispatch(addNewReview(data))
  }
};

export const thunkEditReview = (data, review) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${review.id}`, {
    method: "PUT",
    body: data
  })
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return {'error': data.errors}
    }
    dispatch(editReview(data))
  }
};

export const thunkRemoveReviewById = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE"
  })
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return {'error': data.errors}
    }
    dispatch(removeReview(reviewId))
  }
};

const initialState = { allReviews: null }
let newState = {}

function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_REVIEWS:
      return { ...state, allReviews: action.payload };
    case ADD_NEW_REVIEW:
      newState = {...state}
      newState.allReviews[action.payload.new_review.id] = action.payload.new_review
      return {...newState}
    case EDIT_REVIEW:
      newState = {...state}
      newState.allReviews[action.payload.updated_review.id] = action.payload.updated_review
      return {...newState}
    case REMOVE_REVIEW:
      newState = {allReviews: {...state.allReviews} }
      delete newState.allReviews[action.payload]
      return {...newState}
    default:
      return state
  }
}

export default reviewReducer
