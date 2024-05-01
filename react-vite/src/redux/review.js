const SET_ALL_REVIEWS = 'product/setAllReviews'

const setAllReviews = (allReviews) => ({
  type: SET_ALL_REVIEWS,
  payload: allReviews
})

export const thunkGetAllReviews = () => async (dispatch) => {
  const response = await fetch("/api/reviews/")
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return console.log(`Error with response from thunkGetAllReviews: ${data.errors}`)
    }
    dispatch(setAllReviews(data.all_reviews))
  }
};

const initialState = { allReviews: null }

function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_REVIEWS:
      return { ...state, allReviews: action.payload };
    default:
      return state
  }
}

export default reviewReducer
