import { useDispatch, useSelector } from "react-redux";
import { thunkAddProduct } from "../../redux/product";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './ProductForm.css'

export default function ProductFormModal(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState({})
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [dimension_l, setDimension_l] = useState("")
  const [dimension_w, setDimension_w] = useState("")
  const [dimension_h, setDimension_h] = useState("")
  const [customizable, setCustomizable] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newError = {}

    if (name.length < 3) newError.name = 'Name has to be longer than 3 characters'
    if (!price) newError.price = 'Please enter the price (format: $xxx.xx)'
    if (description.length < 100) newError.description = 'Description has to be longer than 100 characters'
    if (!dimension_l || !dimension_w || !dimension_h) {
      let dimensionError = 'Please enter a'
      if (!dimension_l) dimensionError += ' length'
      if (!dimension_w) dimensionError += ' width'
      if (!dimension_h) dimensionError += ' height'
      newError.dimension = dimensionError
    }

    if (Object.entries(newError).length > 0) return setErrors(newError)

    const productFormData = new FormData(e.currentTarget)
    productFormData.append('name', name)
    productFormData.append('user_id', user.id)
    productFormData.append('price', price)
    productFormData.append('description', description)
    productFormData.append('dimension_l', dimension_l)
    productFormData.append('dimension_w', dimension_w)
    productFormData.append('dimension_h', dimension_h)
    productFormData.append('customizable', customizable)

    const serverResponse = await dispatch(thunkAddProduct(productFormData))

    if (Object.entries(serverResponse).length < 2) {
      console.log(serverResponse)
      setErrors(serverResponse.error)
    } else {
      navigate(`/products/${serverResponse.id}`)
    }
  }


  return (
    <div className="newProductForm">
    <form onSubmit={handleSubmit} encType="multipart/form-data">
    {errors.server && <p>{errors.server}</p>}
      <h1>New Product Form</h1>
        <label>
          <input
            type="text"
            placeholder=" Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {errors.name && <p>{errors.name}</p>}
        <label>
          <input
            type="number"
            step=".01"
            placeholder=" Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            />
        </label>
        {errors.price && <p>{errors.price}</p>}
        <div className="dimensions">
          <span>Dimensions: </span>
          <label className="size">
            <input
              type="number"
              step=".01"
              placeholder=" Length"
              value={dimension_l}
              onChange={(e) => setDimension_l(e.target.value)}
              />
          </label>
          <div>in x</div>
          <label className="size">
            <input
              type="number"
              step=".01"
              placeholder=" Width"
              value={dimension_w}
              onChange={(e) => setDimension_w(e.target.value)}
              />
          </label>
          <div>in x</div>
          <label className="size">
            <input
              type="number"
              step=".01"
              placeholder=" Height"
              value={dimension_h}
              onChange={(e) => setDimension_h(e.target.value)}
              />
          </label>
          <span>in</span>
        </div>
        {errors.dimension && <p>{errors.dimension}</p>}
        <div className="customizable">
          <span>Customizable: </span>
          <label className="options">
            <input
              type="radio"
              value={true}
              onChange={(e) => setCustomizable(e.target.value)}
            />
            True
          </label>
          <label className="options">
            <input
              type="radio"
              value={false}
              defaultChecked={true}
              onChange={(e) => setCustomizable(e.target.value)}
            />
            False
          </label>
        </div>
        {errors.customizable && <p>{errors.customizable}</p>}
        <label>
          <textarea cols={50} rows={10}
            type="text"
            placeholder=" Enter Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        {errors.description && <p>{errors.description}</p>}
        <div className="uploadImg">
          <label>
            <span>Upload product picture(s): </span>
            <input type="file" name='image_files' accept='image/*' alt="" multiple/>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
