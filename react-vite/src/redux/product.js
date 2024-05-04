const SET_ALL_PRODUCTS = 'product/setAllProducts'
const SET_PRODUCT = 'product/setProduct'
const REMOVE_PRODUCT = 'product/removeProduct'

const setAllProducts = (allProducts) => ({
  type: SET_ALL_PRODUCTS,
  payload: allProducts
})

const setProduct = (product) => ({
  type: SET_PRODUCT,
  payload: product
})

const removeProduct = () => ({
  type: REMOVE_PRODUCT
})

export const thunkGetAllProducts = () => async (dispatch) => {
  const response = await fetch("/api/products/")
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return {'error': data.errors}
    }
    dispatch(setAllProducts(data.products))
  }
};

export const thunkGetProductById = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`)
  if (response.ok) {
    const data = await response.json();

    if (data.errors) {
      return {'error': data.errors}
    }
    dispatch(setProduct(data))
  }
};

export const thunkAddProduct = (data) => async (dispatch) => {
  const response = await fetch('/api/products/', {
    method: "POST",
    headers: {
      "enctype": "multipart/form-data"
    },
    body: data
  })

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return {'error': data.errors}
    }
    dispatch(setProduct(data.new_product))
    return data.new_product
  }
};

export const thunkUpdateProductById = (data) => async (dispatch) => {
  const response = await fetch(`/api/products/${data.id}`, {
    method: "PUT",
    body: data
  })
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return {'error': data.errors}
    }
    dispatch(setProduct(data))
  }
};

export const thunkRemoveProductById = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`, {
    method: "DELETE"
  })
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return {'error': data.errors}
    }
    dispatch(removeProduct(data))
  }
};

const initialState = { allProducts: null, product: null }


function productReducer(state = initialState, action) {
  let newState = {}
  switch (action.type) {
    case SET_ALL_PRODUCTS:
      return { ...state, allProducts: action.payload };
    case SET_PRODUCT:
      newState = {...state}
      newState.allProducts[action.payload.id] = action.payload
      newState['product'] = action.payload
      return { ...newState }
    case REMOVE_PRODUCT:
      return { ...state, product: null }
    default:
      return state
  }
}

export default productReducer
